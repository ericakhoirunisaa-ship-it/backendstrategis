import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

function readCsv(filename: string): any[] {
  const filePath = join(__dirname, '../../', filename);
  const content = readFileSync(filePath, 'utf-8').replace(/^﻿/, '');
  return parse(content, { columns: true, skip_empty_lines: true, trim: true, bom: true });
}

async function upsertPoints(
  indikatorId: number,
  points: Array<{ tahun: number; daerah: string; kolom: string; nilai: number }>,
) {
  for (const p of points) {
    await prisma.dataPoint.upsert({
      where: {
        tahun_daerah_kolom_indikatorId: {
          tahun: p.tahun,
          daerah: p.daerah,
          kolom: p.kolom,
          indikatorId,
        },
      },
      update: { nilai: p.nilai },
      create: { ...p, indikatorId },
    });
  }
}

async function main() {
  // Admin user
  const hashed = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@bpstolitoli.go.id' },
    update: {},
    create: {
      email: 'admin@bpstolitoli.go.id',
      password: hashed,
      name: 'Admin BPS Toli-Toli',
      role: 'ADMIN',
    },
  });

  // Statistik utama beranda
  const statistik = [
    { label: 'Jumlah Penduduk', nilai: '236.020', satuan: 'Jiwa', tahun: 2025, icon: 'Users', warna: '#2196F3', urutan: 0 },
    { label: 'PDRB', nilai: '7,42', satuan: 'Triliun Rp', tahun: 2024, icon: 'TrendingUp', warna: '#4CAF50', urutan: 1 },
    { label: 'Tingkat Kemiskinan', nilai: '12,20', satuan: '%', tahun: 2025, icon: 'BarChart2', warna: '#FF9800', urutan: 2 },
    { label: 'IPM', nilai: '68,12', satuan: 'Poin', tahun: 2024, icon: 'Award', warna: '#9C27B0', urutan: 3 },
  ];
  for (const s of statistik) {
    await prisma.statistikUtama.upsert({
      where: { id: s.urutan + 1 },
      update: s,
      create: s,
    });
  }

  // Indikator
  const indikators = [
    {
      nama: 'Kependudukan Per Kecamatan',
      slug: 'penduduk',
      satuan: 'Ribu Jiwa',
      tipeChart: 'bar',
      deskripsi: 'Proyeksi penduduk Kabupaten Toli-Toli per kecamatan (2023–2025)',
    },
    {
      nama: 'PDRB',
      slug: 'pdrb',
      satuan: 'Miliar Rp',
      tipeChart: 'line',
      deskripsi: 'Produk Domestik Regional Bruto Kabupaten Toli-Toli',
    },
    {
      nama: 'Kemiskinan',
      slug: 'kemiskinan',
      satuan: '%',
      tipeChart: 'line',
      deskripsi: 'Indikator kemiskinan Kabupaten Toli-Toli dibanding Sulawesi Tengah',
    },
    {
      nama: 'IPM',
      slug: 'ipm',
      satuan: 'Poin',
      tipeChart: 'area',
      deskripsi: 'Indeks Pembangunan Manusia Kabupaten Toli-Toli',
    },
    {
      nama: 'Struktur Umur Penduduk',
      slug: 'umur-penduduk',
      satuan: 'Jiwa',
      tipeChart: 'bar',
      deskripsi: 'Distribusi penduduk Kabupaten Toli-Toli menurut kelompok umur dan jenis kelamin',
    },
  ];
  for (const ind of indikators) {
    await prisma.indikator.upsert({
      where: { slug: ind.slug },
      update: ind,
      create: ind,
    });
  }

  // === 1. Kependudukan Per Kecamatan (tahun_penduduk.csv) ===
  const indPenduduk = await prisma.indikator.findUnique({ where: { slug: 'penduduk' } });
  if (indPenduduk) {
    const rows = readCsv('tahun_penduduk.csv');
    const numCols = [
      'jumlah_penduduk_jiwa',
      'laju_pertumbuhan_penduduk',
      'persentase_penduduk',
      'kepadatan_penduduk_per_km2',
      'rasio_jenis_kelamin',
    ];
    const points: any[] = [];
    for (const row of rows) {
      const tahun = parseInt(row.tahun);
      const daerah = row.daerah || 'Toli-Toli';
      for (const kolom of numCols) {
        const raw = row[kolom];
        if (raw === '' || raw == null) continue;
        const nilai = parseFloat(raw);
        if (!isNaN(nilai)) points.push({ tahun, daerah, kolom, nilai });
      }
    }
    await upsertPoints(indPenduduk.id, points);
    console.log(`✅ Kependudukan: ${points.length} data points dari ${rows.length} baris CSV`);
  }

  // === 2. Kemiskinan (taun_kemiskinan.csv) ===
  const indKemiskinan = await prisma.indikator.findUnique({ where: { slug: 'kemiskinan' } });
  if (indKemiskinan) {
    const rows = readCsv('taun_kemiskinan.csv');
    const numCols = [
      'garis_kemiskinan',
      'jumlah_miskin',
      'persentase_miskin',
      'indeks_kedalaman',
      'indeks_keparahan',
    ];
    const points: any[] = [];
    for (const row of rows) {
      const tahun = parseInt(row.tahun);
      const daerah = row.daerah || 'Toli-Toli';
      for (const kolom of numCols) {
        const raw = row[kolom];
        if (raw === '' || raw == null) continue;
        const nilai = parseFloat(raw);
        if (!isNaN(nilai)) points.push({ tahun, daerah, kolom, nilai });
      }
    }
    await upsertPoints(indKemiskinan.id, points);
    console.log(`✅ Kemiskinan: ${points.length} data points dari ${rows.length} baris CSV`);
  }

  // === 3. Struktur Umur Penduduk (umurpenduduk.csv) ===
  const indUmur = await prisma.indikator.findUnique({ where: { slug: 'umur-penduduk' } });
  if (indUmur) {
    const rows = readCsv('umurpenduduk.csv');
    const kolmMap = [
      { csvKey: 'laki-laki', dbKolom: 'laki_laki' },
      { csvKey: 'perempuan', dbKolom: 'perempuan' },
      { csvKey: 'jumlah', dbKolom: 'jumlah' },
    ];
    const points: any[] = [];
    for (const row of rows) {
      const firstKey = Object.keys(row)[0];
      const daerah = row['Kelompok Umur'] ?? row[firstKey];
      if (!daerah) continue;
      for (const { csvKey, dbKolom } of kolmMap) {
        const raw = row[csvKey];
        if (raw === '' || raw == null) continue;
        const nilai = parseFloat(raw);
        if (!isNaN(nilai)) points.push({ tahun: 2024, daerah, kolom: dbKolom, nilai });
      }
    }
    await upsertPoints(indUmur.id, points);
    console.log(`✅ Umur Penduduk: ${points.length} data points dari ${rows.length} baris CSV`);
  }

  // === 4. PDRB (hardcoded) ===
  const indPdrb = await prisma.indikator.findUnique({ where: { slug: 'pdrb' } });
  if (indPdrb) {
    const pdrbData = [
      { tahun: 2019, nilai: 5420.5 },
      { tahun: 2020, nilai: 5180.3 },
      { tahun: 2021, nilai: 5650.8 },
      { tahun: 2022, nilai: 6210.4 },
      { tahun: 2023, nilai: 6850.2 },
      { tahun: 2024, nilai: 7420.0 },
    ];
    await upsertPoints(
      indPdrb.id,
      pdrbData.map((d) => ({ ...d, daerah: 'Toli-Toli', kolom: 'nilai' })),
    );
    console.log(`✅ PDRB: ${pdrbData.length} data points`);
  }

  // === Jadwal Rilis (hanya create jika belum ada) ===
  const existingJadwal = await prisma.jadwalRilis.count();
  if (existingJadwal === 0) {
    await prisma.jadwalRilis.createMany({
      data: [
        { judul: 'Kabupaten Toli-Toli Dalam Angka 2025', tanggal: new Date('2025-04-30'), kategori: 'Publikasi', status: 'RELEASED' },
        { judul: 'BRS Pertumbuhan Ekonomi Triwulan I 2025', tanggal: new Date('2025-05-05'), kategori: 'BRS', status: 'RELEASED' },
        { judul: 'Statistik Kesejahteraan Rakyat 2025', tanggal: new Date('2025-07-15'), kategori: 'Publikasi', status: 'UPCOMING' },
        { judul: 'BRS Kemiskinan dan Ketimpangan 2025', tanggal: new Date('2025-07-25'), kategori: 'BRS', status: 'UPCOMING' },
        { judul: 'Indikator Pertanian Toli-Toli 2025', tanggal: new Date('2025-09-10'), kategori: 'Publikasi', status: 'UPCOMING' },
        { judul: 'Infografis IPM Toli-Toli 2025', tanggal: new Date('2025-10-01'), kategori: 'Infografis', status: 'UPCOMING' },
      ],
    });
  }

  console.log('✅ Seed selesai');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndikatorBulananService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const WARNA_BY_KATEGORI = {
    Ekonomi: 'hijau',
    Sosial: 'oranye',
    Pendidikan: 'ungu',
    Kesehatan: 'merah',
    Ketenagakerjaan: 'kuning',
    Pertanian: 'hijau',
};
function formatNilai(n) {
    if (Number.isInteger(n))
        return n.toString();
    return parseFloat(n.toFixed(2)).toString();
}
let IndikatorBulananService = class IndikatorBulananService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(bulan, tahun) {
        const where = { aktif: true };
        if (bulan)
            where.bulan = bulan;
        if (tahun)
            where.tahun = tahun;
        return this.prisma.indikatorBulanan.findMany({ where, orderBy: { urutan: 'asc' } });
    }
    findAllAdmin() {
        return this.prisma.indikatorBulanan.findMany({ orderBy: [{ tahun: 'desc' }, { bulan: 'desc' }, { urutan: 'asc' }] });
    }
    async findStrategisYears() {
        const rows = await this.prisma.dataPoint.findMany({
            where: { daerah: 'Toli-Toli' },
            select: { tahun: true },
            distinct: ['tahun'],
            orderBy: { tahun: 'desc' },
        });
        return rows.map((r) => r.tahun);
    }
    async findCombined(bulan, tahun) {
        const manual = await this.findAll(bulan, tahun);
        if (!tahun) {
            return manual.map((m) => ({ ...m, sumber: 'manual' }));
        }
        const indikators = await this.prisma.indikator.findMany({
            where: { aktif: true },
            include: {
                data: {
                    where: {
                        daerah: 'Toli-Toli',
                        tahun: { in: [tahun, tahun - 1] },
                    },
                },
            },
            orderBy: [{ kategori: 'asc' }, { nama: 'asc' }],
        });
        const autoEntries = [];
        let autoUrutan = 1000;
        for (const ind of indikators) {
            const currPoint = ind.data.find((d) => d.tahun === tahun && d.kolom === 'nilai') ??
                ind.data.find((d) => d.tahun === tahun);
            if (!currPoint)
                continue;
            const prevPoint = ind.data.find((d) => d.tahun === tahun - 1 && d.kolom === currPoint.kolom) ??
                ind.data.find((d) => d.tahun === tahun - 1);
            let perubahan;
            let arahPerubahan;
            let keterangan;
            if (prevPoint) {
                const diff = currPoint.nilai - prevPoint.nilai;
                arahPerubahan = diff > 0 ? 'naik' : diff < 0 ? 'turun' : 'tetap';
                const sign = diff >= 0 ? '+' : '';
                perubahan = `${sign}${formatNilai(diff)} ${ind.satuan}`;
                keterangan = `vs ${tahun - 1}: ${formatNilai(prevPoint.nilai)} ${ind.satuan}`;
            }
            else {
                keterangan = `Data tahun ${tahun}`;
            }
            autoEntries.push({
                id: -(ind.id),
                judul: ind.nama,
                nilai: formatNilai(currPoint.nilai),
                satuan: ind.satuan,
                perubahan,
                arahPerubahan,
                keterangan,
                periode: undefined,
                warna: WARNA_BY_KATEGORI[ind.kategori] ?? 'biru',
                urutan: autoUrutan++,
                bulan: bulan ?? new Date().getMonth() + 1,
                tahun,
                aktif: true,
                sumber: 'strategis',
            });
        }
        const manualJuduls = new Set(manual.map((m) => m.judul.trim().toLowerCase()));
        const filteredAuto = autoEntries.filter((a) => !manualJuduls.has(a.judul.trim().toLowerCase()));
        return [
            ...manual.map((m) => ({ ...m, sumber: 'manual' })),
            ...filteredAuto,
        ];
    }
    create(data) {
        return this.prisma.indikatorBulanan.create({ data });
    }
    update(id, data) {
        return this.prisma.indikatorBulanan.update({ where: { id }, data });
    }
    remove(id) {
        return this.prisma.indikatorBulanan.delete({ where: { id } });
    }
};
exports.IndikatorBulananService = IndikatorBulananService;
exports.IndikatorBulananService = IndikatorBulananService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IndikatorBulananService);
//# sourceMappingURL=indikator-bulanan.service.js.map
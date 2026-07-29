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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const sync_1 = require("csv-parse/sync");
const fs_1 = require("fs");
const indikator_service_1 = require("../indikator/indikator.service");
const NON_VALUE_COLS = new Set(['tahun', 'daerah', 'keterangan', 'catatan', 'kecamatan', 'kabupaten']);
let UploadService = class UploadService {
    indikatorService;
    constructor(indikatorService) {
        this.indikatorService = indikatorService;
    }
    async parseAndPreview(filePath) {
        const content = (0, fs_1.readFileSync)(filePath, 'utf-8');
        let records;
        try {
            records = (0, sync_1.parse)(content, { columns: true, skip_empty_lines: true, trim: true, bom: true });
        }
        catch (e) {
            try {
                (0, fs_1.unlinkSync)(filePath);
            }
            catch { }
            throw new common_1.BadRequestException(`Format CSV tidak valid: ${e.message}`);
        }
        if (!records.length) {
            try {
                (0, fs_1.unlinkSync)(filePath);
            }
            catch { }
            throw new common_1.BadRequestException('File CSV kosong');
        }
        const headers = Object.keys(records[0]);
        const rows = records.slice(0, 10);
        try {
            (0, fs_1.unlinkSync)(filePath);
        }
        catch { }
        return { headers, rows, totalRows: records.length };
    }
    async importCsv(filePath, indikatorId, kolomNilai) {
        const content = (0, fs_1.readFileSync)(filePath, 'utf-8');
        let records;
        try {
            records = (0, sync_1.parse)(content, { columns: true, skip_empty_lines: true, trim: true, bom: true });
        }
        catch (e) {
            try {
                (0, fs_1.unlinkSync)(filePath);
            }
            catch { }
            throw new common_1.BadRequestException(`Format CSV tidak valid: ${e.message}`);
        }
        if (!records.length) {
            try {
                (0, fs_1.unlinkSync)(filePath);
            }
            catch { }
            throw new common_1.BadRequestException('File CSV kosong');
        }
        const headers = Object.keys(records[0]);
        if (!headers.includes('tahun')) {
            try {
                (0, fs_1.unlinkSync)(filePath);
            }
            catch { }
            throw new common_1.BadRequestException("CSV harus memiliki kolom 'tahun'");
        }
        const valueCols = kolomNilai
            ? [kolomNilai]
            : headers.filter(h => !NON_VALUE_COLS.has(h.toLowerCase()));
        if (valueCols.length === 0) {
            try {
                (0, fs_1.unlinkSync)(filePath);
            }
            catch { }
            throw new common_1.BadRequestException('Tidak ada kolom nilai yang ditemukan. Pastikan CSV memiliki kolom data selain tahun dan daerah.');
        }
        const errors = [];
        const points = [];
        for (let i = 0; i < records.length; i++) {
            const row = records[i];
            const rowNum = i + 2;
            const rawTahun = String(row['tahun'] || '').replace(/[.,]/g, '').trim();
            const tahun = parseInt(rawTahun);
            if (isNaN(tahun) || tahun < 1900 || tahun > 2100) {
                errors.push(`Baris ${rowNum}: kolom 'tahun' tidak valid ("${row['tahun']}")`);
                continue;
            }
            const daerah = (row['daerah'] || row['kecamatan'] || row['kabupaten'] || 'Toli-Toli').trim();
            let hasValue = false;
            for (const col of valueCols) {
                const raw = row[col];
                if (raw === '' || raw === null || raw === undefined)
                    continue;
                const normalized = String(raw).replace(/\./g, '').replace(',', '.').trim();
                const nilai = parseFloat(normalized);
                if (isNaN(nilai))
                    continue;
                points.push({ tahun, daerah, kolom: col, nilai });
                hasValue = true;
            }
            if (!hasValue) {
                errors.push(`Baris ${rowNum}: tidak ada nilai numerik yang valid`);
            }
        }
        try {
            (0, fs_1.unlinkSync)(filePath);
        }
        catch { }
        if (!points.length) {
            throw new common_1.BadRequestException('Tidak ada data valid yang bisa diimpor. ' +
                'Pastikan format CSV: kolom pertama "tahun", kolom berikutnya nama nilai (mis: nilai, pertumbuhan_ekonomi, ipm, dll).');
        }
        const result = await this.indikatorService.bulkUpsertDataPoints(indikatorId, points);
        return { inserted: result.inserted, errors };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [indikator_service_1.IndikatorService])
], UploadService);
//# sourceMappingURL=upload.service.js.map
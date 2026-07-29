import { IndikatorService } from '../indikator/indikator.service';
export declare class UploadService {
    private indikatorService;
    constructor(indikatorService: IndikatorService);
    parseAndPreview(filePath: string): Promise<{
        headers: string[];
        rows: any[];
        totalRows: number;
    }>;
    importCsv(filePath: string, indikatorId: number, kolomNilai?: string): Promise<{
        inserted: number;
        errors: string[];
    }>;
}

import { UploadService } from './upload.service';
export declare class UploadController {
    private service;
    constructor(service: UploadService);
    preview(file: Express.Multer.File): Promise<{
        headers: string[];
        rows: any[];
        totalRows: number;
    }>;
    import(indikatorId: number, file: Express.Multer.File, kolom?: string): Promise<{
        inserted: number;
        errors: string[];
    }>;
}

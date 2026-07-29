import { ConfigService } from '@nestjs/config';
export declare class NotificationService {
    private config;
    private readonly logger;
    constructor(config: ConfigService);
    kirimEmailKonfirmasi(email: string, nama: string): Promise<void>;
    kirimWhatsAppKonfirmasi(noTelpon: string, nama: string): Promise<void>;
    private formatNomorID;
    private emailTemplate;
    private whatsappTemplate;
}

import { PrismaService } from './prisma/prisma.service';
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getHello(): string;
    getHealth(): {
        status: string;
        timestamp: string;
        uptime: number;
    };
    getDatabaseHealth(): Promise<{
        status: string;
        database: string;
        message?: undefined;
    } | {
        status: string;
        database: string;
        message: any;
    }>;
}

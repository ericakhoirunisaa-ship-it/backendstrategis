import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
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

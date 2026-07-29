import { StatsService } from './stats.service';
export declare class StatsController {
    private service;
    constructor(service: StatsService);
    get(): Promise<{
        pengunjung: number;
    }>;
    kunjungan(): Promise<{
        pengunjung: number;
    }>;
}

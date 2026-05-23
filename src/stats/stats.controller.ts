import { Controller, Get, Post } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private service: StatsService) {}

  @Get()
  get() { return this.service.get(); }

  @Post('kunjungan')
  kunjungan() { return this.service.kunjungan(); }
}

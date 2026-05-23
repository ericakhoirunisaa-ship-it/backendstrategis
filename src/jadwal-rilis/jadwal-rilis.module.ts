import { Module } from '@nestjs/common';
import { JadwalRilisController } from './jadwal-rilis.controller';
import { JadwalRilisService } from './jadwal-rilis.service';

@Module({
  controllers: [JadwalRilisController],
  providers: [JadwalRilisService],
})
export class JadwalRilisModule {}

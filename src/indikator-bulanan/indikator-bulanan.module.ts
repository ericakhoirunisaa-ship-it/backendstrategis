import { Module } from '@nestjs/common';
import { IndikatorBulananService } from './indikator-bulanan.service';
import { IndikatorBulananController } from './indikator-bulanan.controller';

@Module({
  controllers: [IndikatorBulananController],
  providers: [IndikatorBulananService],
})
export class IndikatorBulananModule {}

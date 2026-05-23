import { Module } from '@nestjs/common';
import { IndikatorController } from './indikator.controller';
import { IndikatorService } from './indikator.service';

@Module({
  controllers: [IndikatorController],
  providers: [IndikatorService],
  exports: [IndikatorService],
})
export class IndikatorModule {}

import { Module } from '@nestjs/common';
import { KepuasanController } from './kepuasan.controller';
import { KepuasanService } from './kepuasan.service';

@Module({
  controllers: [KepuasanController],
  providers: [KepuasanService],
})
export class KepuasanModule {}

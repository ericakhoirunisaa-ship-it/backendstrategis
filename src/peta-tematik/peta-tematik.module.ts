import { Module } from '@nestjs/common';
import { PetaTematikController } from './peta-tematik.controller';
import { PetaTematikService } from './peta-tematik.service';

@Module({
  controllers: [PetaTematikController],
  providers: [PetaTematikService],
})
export class PetaTematikModule {}

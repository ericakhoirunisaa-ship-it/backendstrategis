import { Module } from '@nestjs/common';
import { PortalDaerahController } from './portal-daerah.controller';
import { PortalDaerahService } from './portal-daerah.service';

@Module({
  controllers: [PortalDaerahController],
  providers: [PortalDaerahService],
})
export class PortalDaerahModule {}

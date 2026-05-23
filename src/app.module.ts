import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StatistikModule } from './statistik/statistik.module';
import { IndikatorModule } from './indikator/indikator.module';
import { JadwalRilisModule } from './jadwal-rilis/jadwal-rilis.module';
import { UploadModule } from './upload/upload.module';
import { PetaTematikModule } from './peta-tematik/peta-tematik.module';
import { InfografisModule } from './infografis/infografis.module';
import { PengaduanModule } from './pengaduan/pengaduan.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    StatistikModule,
    IndikatorModule,
    JadwalRilisModule,
    UploadModule,
    PetaTematikModule,
    InfografisModule,
    PengaduanModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

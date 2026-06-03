import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PengaduanController } from './pengaduan.controller';
import { PengaduanService } from './pengaduan.service';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/pengaduan',
        filename: (_, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_, file, cb) => {
        const allowed = /jpeg|jpg|png|webp|pdf/;
        if (allowed.test(extname(file.originalname).toLowerCase())) {
          cb(null, true);
        } else {
          cb(new Error('Hanya file gambar (JPG/PNG/WEBP) atau PDF yang diizinkan'), false);
        }
      },
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  ],
  controllers: [PengaduanController],
  providers: [PengaduanService, NotificationService],
})
export class PengaduanModule {}

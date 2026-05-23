import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { IndikatorModule } from '../indikator/indikator.module';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
          cb(null, true);
        } else {
          cb(new Error('Hanya file CSV yang diizinkan'), false);
        }
      },
    }),
    IndikatorModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}

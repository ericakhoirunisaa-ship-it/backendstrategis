import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { InfografisController } from './infografis.controller';
import { InfografisService } from './infografis.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/infografis',
        filename: (_, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_, file, cb) => {
        const allowed = /jpeg|jpg|png|webp|gif/;
        if (allowed.test(extname(file.originalname).toLowerCase())) {
          cb(null, true);
        } else {
          cb(new Error('Hanya file gambar yang diizinkan'), false);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    }),
  ],
  controllers: [InfografisController],
  providers: [InfografisService],
})
export class InfografisModule {}

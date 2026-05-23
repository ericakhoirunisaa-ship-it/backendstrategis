import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { JadwalRilisService } from './jadwal-rilis.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsString, IsOptional, IsDateString } from 'class-validator';

class CreateJadwalDto {
  @IsString() judul: string;
  @IsDateString() tanggal: string;
  @IsOptional() @IsString() kategori?: string;
  @IsOptional() @IsString() deskripsi?: string;
  @IsOptional() @IsString() link?: string;
}

class UpdateJadwalDto {
  @IsOptional() @IsString() judul?: string;
  @IsOptional() @IsDateString() tanggal?: string;
  @IsOptional() @IsString() kategori?: string;
  @IsOptional() @IsString() deskripsi?: string;
  @IsOptional() @IsString() link?: string;
  @IsOptional() @IsString() status?: string;
}

@Controller('jadwal-rilis')
export class JadwalRilisController {
  constructor(private service: JadwalRilisService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get('upcoming')
  findUpcoming() { return this.service.findUpcoming(); }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateJadwalDto) {
    return this.service.create({ ...dto, tanggal: new Date(dto.tanggal) });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateJadwalDto) {
    const data: any = { ...dto };
    if (dto.tanggal) data.tanggal = new Date(dto.tanggal);
    return this.service.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}

import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { IndikatorService } from './indikator.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsString, IsOptional, IsBoolean, IsNumber, IsInt } from 'class-validator';

class CreateIndikatorDto {
  @IsString() nama: string;
  @IsOptional() @IsString() slug?: string;
  @IsString() satuan: string;
  @IsOptional() @IsString() kategori?: string;
  @IsOptional() @IsString() tipeChart?: string;
  @IsOptional() @IsString() deskripsi?: string;
  @IsOptional() @IsString() definisi?: string;
  @IsOptional() @IsString() metodologi?: string;
  @IsOptional() @IsString() sumberData?: string;
  @IsOptional() @IsString() interpretasi?: string;
}

class UpdateIndikatorDto {
  @IsOptional() @IsString() nama?: string;
  @IsOptional() @IsString() satuan?: string;
  @IsOptional() @IsString() kategori?: string;
  @IsOptional() @IsString() tipeChart?: string;
  @IsOptional() @IsString() deskripsi?: string;
  @IsOptional() @IsString() definisi?: string;
  @IsOptional() @IsString() metodologi?: string;
  @IsOptional() @IsString() sumberData?: string;
  @IsOptional() @IsString() interpretasi?: string;
  @IsOptional() @IsBoolean() aktif?: boolean;
  @IsOptional() @IsBoolean() filterTahun?: boolean;
  @IsOptional() @IsBoolean() filterDaerah?: boolean;
  @IsOptional() @IsBoolean() filterKolom?: boolean;
}

class AddDataPointDto {
  @IsInt() tahun: number;
  @IsOptional() @IsString() daerah?: string;
  @IsOptional() @IsString() kolom?: string;
  @IsNumber() nilai: number;
  @IsOptional() @IsString() keterangan?: string;
}

class UpdateDataPointKeteranganDto {
  @IsOptional() @IsString() keterangan?: string;
}

@Controller('indikator')
export class IndikatorController {
  constructor(private service: IndikatorService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('kategori') kategori?: string,
  ) { return this.service.findAll({ search, kategori }); }

  @Get(':slug')
  findOne(@Param('slug') slug: string) { return this.service.findBySlug(slug); }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateIndikatorDto) { return this.service.create(dto); }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateIndikatorDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }

  @UseGuards(JwtAuthGuard)
  @Post(':id/data')
  addData(@Param('id', ParseIntPipe) id: number, @Body() dto: AddDataPointDto) {
    return this.service.addDataPoint(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('datapoint/:id')
  updateDataPointKeterangan(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDataPointKeteranganDto,
  ) {
    return this.service.updateDataPointKeterangan(id, dto.keterangan ?? null);
  }
}

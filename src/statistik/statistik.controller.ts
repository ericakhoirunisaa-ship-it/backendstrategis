import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { StatistikService } from './statistik.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsOptional, IsString, IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

class CreateStatistikDto {
  @IsNotEmpty() @IsString() label: string;
  @IsNotEmpty() @IsString() nilai: string;
  @IsNotEmpty() @IsString() satuan: string;
  @Type(() => Number) @IsInt() @Min(1900) tahun: number;
  @IsOptional() @IsString() icon?: string;
  @IsOptional() @IsString() warna?: string;
  @IsOptional() @Type(() => Number) @IsInt() urutan?: number;
}

class UpdateStatistikDto {
  @IsOptional() @IsString() label?: string;
  @IsOptional() @IsString() nilai?: string;
  @IsOptional() @IsString() satuan?: string;
  @IsOptional() @Type(() => Number) @IsInt() tahun?: number;
  @IsOptional() @IsString() icon?: string;
  @IsOptional() @IsString() warna?: string;
  @IsOptional() @Type(() => Number) @IsInt() urutan?: number;
}

@Controller('statistik')
export class StatistikController {
  constructor(private service: StatistikService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateStatistikDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStatistikDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}

import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PetaTematikService } from './peta-tematik.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsString, IsOptional, IsInt } from 'class-validator';

class CreatePetaDto {
  @IsString() judul: string;
  @IsOptional() @IsString() deskripsi?: string;
  @IsOptional() @IsString() imageUrl?: string;
  @IsOptional() @IsString() geoJsonUrl?: string;
  @IsOptional() @IsInt() indikatorId?: number;
}

class UpdatePetaDto {
  @IsOptional() @IsString() judul?: string;
  @IsOptional() @IsString() deskripsi?: string;
  @IsOptional() @IsString() imageUrl?: string;
  @IsOptional() @IsString() geoJsonUrl?: string;
  @IsOptional() @IsInt() indikatorId?: number;
}

@Controller('peta-tematik')
export class PetaTematikController {
  constructor(private service: PetaTematikService) {}

  @Get()
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePetaDto) { return this.service.create(dto); }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePetaDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}

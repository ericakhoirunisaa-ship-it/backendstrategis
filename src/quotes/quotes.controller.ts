import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

class CreateQuoteDto {
  @IsString() teks: string;
  @IsOptional() @IsString() penulis?: string;
  @IsOptional() @IsInt() urutan?: number;
}

class UpdateQuoteDto {
  @IsOptional() @IsString() teks?: string;
  @IsOptional() @IsString() penulis?: string;
  @IsOptional() @IsInt() urutan?: number;
  @IsOptional() @IsBoolean() aktif?: boolean;
}

@Controller('quotes')
export class QuotesController {
  constructor(private service: QuotesService) {}

  @Get()
  findAll(@Query('all') all?: string) {
    return this.service.findAll(all !== 'true');
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateQuoteDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateQuoteDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

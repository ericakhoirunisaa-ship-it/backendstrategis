import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { IndikatorBulananService } from './indikator-bulanan.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('indikator-bulanan')
export class IndikatorBulananController {
  constructor(private readonly service: IndikatorBulananService) {}

  @Get()
  findAll(@Query('bulan') bulan?: string, @Query('tahun') tahun?: string) {
    return this.service.findAll(bulan ? +bulan : undefined, tahun ? +tahun : undefined);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  findAllAdmin() {
    return this.service.findAllAdmin();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}

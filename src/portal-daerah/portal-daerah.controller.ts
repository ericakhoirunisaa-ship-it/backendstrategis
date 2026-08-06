import {
  Controller, Get, Post, Put, Delete, Param, Body,
  UseGuards, ParseIntPipe, Query,
} from '@nestjs/common';
import { PortalDaerahService } from './portal-daerah.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('portal-daerah')
export class PortalDaerahController {
  constructor(private service: PortalDaerahService) {}

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('dinas') dinas?: string,
    @Query('topik') topik?: string,
    @Query('admin') admin?: string,
  ) {
    if (admin === 'true') return this.service.findAllAdmin();
    return this.service.findAll(search, dinas, topik);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post(':id/view')
  incrementView(@Param('id', ParseIntPipe) id: number) {
    return this.service.incrementView(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: {
    judul: string;
    dinas: string;
    bidang: string;
    topik: string;
    tahunMulai: number;
    tahunAkhir: number;
    deskripsi?: string;
    tanggalUpdate: string;
    icon?: string;
    iconBg?: string;
    iconColor?: string;
    columns: string[];
    rows?: Record<string, string | number>[];
  }) {
    return this.service.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: {
      judul?: string;
      dinas?: string;
      bidang?: string;
      topik?: string;
      tahunMulai?: number;
      tahunAkhir?: number;
      deskripsi?: string;
      tanggalUpdate?: string;
      icon?: string;
      iconBg?: string;
      iconColor?: string;
      aktif?: boolean;
    },
  ) {
    return this.service.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/rows')
  replaceRows(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { columns: string[]; rows: Record<string, string | number>[] },
  ) {
    return this.service.replaceRows(id, body.columns, body.rows);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

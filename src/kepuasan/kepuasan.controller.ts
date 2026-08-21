import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { KepuasanService } from './kepuasan.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('kepuasan')
export class KepuasanController {
  constructor(private service: KepuasanService) {}

  @Post()
  create(@Body() body: any) {
    const fields = ['u1','u2','u3','u4','u5','k1','k2','k3','k4','k5','s1','s2','s3','s4'];
    for (const f of fields) {
      const v = Number(body[f]);
      if (!Number.isInteger(v) || v < 1 || v > 5) {
        throw new BadRequestException(`Field ${f} harus bernilai 1–5`);
      }
    }
    return this.service.create({
      u1: +body.u1, u2: +body.u2, u3: +body.u3, u4: +body.u4, u5: +body.u5,
      k1: +body.k1, k2: +body.k2, k3: +body.k3, k4: +body.k4, k5: +body.k5,
      s1: +body.s1, s2: +body.s2, s3: +body.s3, s4: +body.s4,
      nama: body.nama || undefined,
      saran: body.saran || undefined,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  getStats() {
    return this.service.getStats();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.service.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

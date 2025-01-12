import { Module } from '@nestjs/common';
import { LichChieuService } from './lichchieu.service';
import { LichChieuController } from './lichchieu.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LichChieuController],
  providers: [LichChieuService, PrismaService],
})
export class LichChieuModule {} 
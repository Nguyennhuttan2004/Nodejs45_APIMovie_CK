import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CybersoftGuard } from '../guards/cybersoft.guard';

@Module({
  providers: [BannerService, PrismaService, CybersoftGuard],
  controllers: [BannerController],
})
export class BannerModule {} 
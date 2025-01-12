// src/rap/rap.module.ts
import { Module } from '@nestjs/common';
import { RapService } from './rap.service';
import { RapController } from './rap.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [RapController],
  providers: [RapService, PrismaService],
})
export class RapModule {}
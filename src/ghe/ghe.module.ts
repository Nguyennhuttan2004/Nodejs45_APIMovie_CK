import { Module } from '@nestjs/common';
import { GheService } from './ghe.service';
import { GheController } from './ghe.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [GheController],
  providers: [GheService, PrismaService],
})
export class GheModule {} 
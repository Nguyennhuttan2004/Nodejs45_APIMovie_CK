import { Module } from '@nestjs/common';
import { CumRapService } from './cumrap.service';
import { CumRapController } from './cumrap.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CumRapController],
  providers: [CumRapService, PrismaService],
})
export class CumRapModule {} 
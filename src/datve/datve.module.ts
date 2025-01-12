import { Module } from '@nestjs/common';
import { DatVeController } from './datve.controller';
import { DatVeService } from './datve.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DatVeController],
  providers: [DatVeService,PrismaService],
})
export class DatVeModule {}
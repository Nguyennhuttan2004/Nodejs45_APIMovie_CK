import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CybersoftGuard } from '../guards/cybersoft.guard';

@Module({
  providers: [MovieService, PrismaService, CybersoftGuard],
  controllers: [MovieController],
})
export class MovieModule {} 
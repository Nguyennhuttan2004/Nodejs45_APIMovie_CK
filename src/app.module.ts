import { DatVeModule } from './datve/datve.module';
// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { MovieModule } from './movie/movie.module';
import { BannerModule } from './banner/banner.module';
import { RapModule } from './rap/rap.module';
import { CumRapModule } from './cumrap/cumrap.module';
import { LichChieuModule } from './lichchieu/lichchieu.module';
import { GheModule } from './ghe/ghe.module';

@Module({
  imports: [AuthModule, MovieModule, BannerModule, RapModule, CumRapModule, LichChieuModule, DatVeModule, GheModule],
  controllers: [],
  providers: [AppService, PrismaService],
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CybersoftGuard } from '../guards/cybersoft.guard';

@Module({
  providers: [AuthService, PrismaService, CybersoftGuard],
  controllers: [AuthController]
})
export class AuthModule {}

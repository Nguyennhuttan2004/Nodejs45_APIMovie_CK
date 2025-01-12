import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CybersoftGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.tokencybersoft;

    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    // Token cố định để test
    const CYBERSOFT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MCIsIkhldEhhblN0cmluZyI6IjE4LzAxLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwNTUzNjAwMDAwMCIsIm5iZiI6MTY3NzQzMDgwMCwiZXhwIjoxNzA1NjgzNjAwfQ.s4X0R0qpcN0IlXsO3T4IzYcvVpiFuOGC7jUxBY_yg8E';

    if (token !== CYBERSOFT_TOKEN) {
      throw new UnauthorizedException('Token is invalid');
    }

    return true;
  }
} 
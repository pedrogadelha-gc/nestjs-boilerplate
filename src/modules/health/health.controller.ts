import { PrismaService } from '@/shared/database/prisma/prisma.service';
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthCheckService,
    private readonly prismaHealth: PrismaHealthIndicator,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  public check() {
    return this.healthService.check([
      () => this.prismaHealth.pingCheck('database', this.prismaService),
    ]);
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { HealthCheckResult } from '@nestjs/terminus';
import {
    HealthCheck,
    HealthCheckService,
    TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
@ApiTags('health')
export class HealthCheckerController {
    constructor(
        private healthCheckService: HealthCheckService,
        private ormIndicator: TypeOrmHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    async check(): Promise<HealthCheckResult> {
        return this.healthCheckService.check([
            () => this.ormIndicator.pingCheck('database', { timeout: 1500 }),
        ]);
    }
}

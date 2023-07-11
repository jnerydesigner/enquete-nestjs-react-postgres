
import { Logger, Module } from '@nestjs/common';

import { HealthCheckController } from '@controllers/health-check/health-check.controller';
import { HealthCheckService } from '@application/services/health-check.service';

@Module({
  imports: [],
  controllers: [HealthCheckController],
  providers: [Logger, HealthCheckService],
})
export class HealthCheckModule { }

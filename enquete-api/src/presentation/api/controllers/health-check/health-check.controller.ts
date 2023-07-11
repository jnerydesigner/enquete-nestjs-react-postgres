
import { IHealthCheck } from '@application/interfaces/health-check.interface';
import { HealthCheckService } from '@application/services/health-check.service';
import { Controller, Get, Logger } from '@nestjs/common';



@Controller()
export class HealthCheckController {
  private readonly logger: Logger;
  constructor(private readonly appService: HealthCheckService) {
    this.logger = new Logger(HealthCheckController.name);
  }

  @Get('/health-check')
  getHello(): IHealthCheck {
    return this.appService.getHealthCheck();
  }
}

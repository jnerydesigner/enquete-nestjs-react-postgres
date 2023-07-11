import { Logs } from '@application/enums/health-check.Enum';
import { IHealthCheck } from '@application/interfaces/health-check.interface';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  constructor(private logger: Logger) {
    this.logger = new Logger(HealthCheckService.name);
  }

  getHealthCheck(): IHealthCheck {
    this.logger.log(Logs.OK);

    return { message: 'ok' };
  }
}

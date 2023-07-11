import { HealthCheckModule } from '@modules/health-check.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('HealthChec (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthCheckModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/health-check (GET)', () => {
    return request(app.getHttpServer()).get('/health-check').expect(200).expect({
      message: 'ok',
    });
  });
});

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../../src/app.module';

describe('OperationController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/operations/upload (POST) - should return 400 for missing file', () => {
    return request(app.getHttpServer())
      .post('/operations/upload')
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toEqual(
          'Arquivo inválido ou ausente. Deve ser um arquivo CSV.',
        );
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

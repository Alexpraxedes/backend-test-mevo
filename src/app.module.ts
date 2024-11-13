import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperationService } from './operation/operation.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, OperationService],
})
export class AppModule {}

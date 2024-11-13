import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperationService } from './operation/operation.service';
import { CsvModule } from 'nest-csv-parser';

@Module({
  imports: [CsvModule],
  controllers: [AppController],
  providers: [AppService, OperationService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { CsvParser } from 'nest-csv-parser';
import { UploadOperationsCommand } from './application/commands/upload-operations.command';
import { OperationDomainService } from './domain/services/operation-domain.service';
import { PrismaOperationRepository } from './infrastructure/database/prisma/operation.prisma.repository';
import { OperationController } from './presentation/controllers/operation.controller';

@Module({
  imports: [],
  controllers: [OperationController],
  providers: [
    CsvParser,
    UploadOperationsCommand,
    OperationDomainService,
    PrismaOperationRepository,
  ],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { CsvParser } from 'nest-csv-parser';
import { Readable } from 'stream';
import { Operation } from '../../domain/models/operation.model';
import { OperationDomainService } from '../../domain/services/operation-domain.service';
import { PrismaOperationRepository } from '../../infrastructure/database/prisma/operation.prisma.repository';

@Injectable()
export class UploadOperationsCommand {
  constructor(
    private readonly csvParser: CsvParser,
    private readonly operationDomainService: OperationDomainService,
    private readonly operationRepository: PrismaOperationRepository,
  ) {}

  async execute(file: Express.Multer.File): Promise<any> {
    const processFile = file.buffer.toString();
    const headerFile = processFile.split('\n', 1)[0];

    if (headerFile.trim() !== 'from;to;amount') {
      return { message: 'Arquivo com formato inválido de dados!' };
    }

    const parsedData = await this.parseCSV(file.buffer);
    const { validOperations, invalidSummary } =
      this.operationDomainService.processOperations(
        parsedData,
        file.originalname,
      );

    await this.operationRepository.createManyValidOperations(validOperations);
    await this.operationRepository.createInvalidOperation(invalidSummary);

    return {
      status: 'success',
      message: 'Upload processado com sucesso!',
      validCount: validOperations.length,
      supectedsCount: invalidSummary.supectedsCount,
      invalidCount:
        invalidSummary.negativeCount + invalidSummary.duplicateCount,
      invalidDetails: {
        negativeCount: invalidSummary.negativeCount,
        duplicateCount: invalidSummary.duplicateCount,
      },
    };
  }

  private async parseCSV(buffer: Buffer): Promise<Operation[]> {
    const stream = Readable.from(buffer);
    const parsed = await this.csvParser.parse(stream, Operation);
    return parsed.list;
  }
}

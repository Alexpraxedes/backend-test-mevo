import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CsvParser } from 'nest-csv-parser';
import { Readable } from 'stream';

class Operation {
  from: string;
  to: string;
  amount: number;
  suspected: boolean;
}

@Injectable()
export class OperationService {
  private prisma = new PrismaClient();

  constructor(private readonly csvParser: CsvParser) {}

  async uploadCSV(file: Express.Multer.File): Promise<any> {
    const processFile = file.buffer.toString();
    const headerFile = processFile.split('\n', 1)[0];

    if (headerFile.trim() !== 'from;to;amount') {
      return { message: 'Arquivo com formato inválido de dados!' };
    }

    const parsedData = await this.parseCSV(file.buffer);
    const { validOperations, invalidSummary } = this.processOperations(
      parsedData,
      file.originalname,
    );

    await this.prisma.validOperation.createMany({
      data: validOperations,
    });

    await this.prisma.invalidOperation.create({
      data: invalidSummary,
    });

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

  private processOperations(data: Operation[], fileName: string) {
    const seenOperations = new Set<string>();
    const validOperations: Operation[] = [];

    let negativeCount = 0;
    let duplicateCount = 0;
    let supectedsCount = 0;

    for (const operation of data) {
      const { from, to, amount } = operation;
      const parsedAmount = Number(amount);
      const operationKey = `${from}-${to}-${parsedAmount}`;

      if (isNaN(parsedAmount)) {
        negativeCount++;
      } else if (parsedAmount < 0) {
        negativeCount++;
      } else if (seenOperations.has(operationKey)) {
        duplicateCount++;
      } else {
        const suspected = parsedAmount > 5000000;
        supectedsCount += suspected ? 1 : 0;
        validOperations.push({ from, to, amount: parsedAmount, suspected });
        seenOperations.add(operationKey);
      }
    }

    const invalidSummary = {
      file: fileName,
      negativeCount,
      duplicateCount,
      supectedsCount,
    };

    return { validOperations, invalidSummary };
  }
}

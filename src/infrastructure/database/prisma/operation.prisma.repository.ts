import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Operation } from 'src/domain/models/operation.model';

@Injectable()
export class PrismaOperationRepository {
  private prisma = new PrismaClient();

  async createManyValidOperations(validOperations: Operation[]): Promise<void> {
    await this.prisma.validOperation.createMany({
      data: validOperations.map((op) => ({
        from: op.from,
        to: op.to,
        amount: op.amount,
        suspected: op.suspected,
      })),
    });
  }

  async createInvalidOperation(invalidSummary: {
    file: string;
    negativeCount: number;
    duplicateCount: number;
    supectedsCount: number;
  }): Promise<void> {
    await this.prisma.invalidOperation.create({
      data: invalidSummary,
    });
  }
}

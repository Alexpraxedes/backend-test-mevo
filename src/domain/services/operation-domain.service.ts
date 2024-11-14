import { Injectable } from '@nestjs/common';
import { Operation } from '../models/operation.model';

@Injectable()
export class OperationDomainService {
  processOperations(
    data: Operation[],
    fileName: string,
  ): {
    validOperations: Operation[];
    invalidSummary: {
      file: string;
      negativeCount: number;
      duplicateCount: number;
      supectedsCount: number;
    };
  } {
    const seenOperations = new Set<string>();
    const validOperations: Operation[] = [];
    let negativeCount = 0;
    let duplicateCount = 0;
    let supectedsCount = 0;

    for (const operation of data) {
      const { from, to, amount } = operation;
      const operationKey = `${from}-${to}-${amount}`;

      if (isNaN(amount)) {
        negativeCount++;
      } else if (amount < 0) {
        negativeCount++;
      } else if (seenOperations.has(operationKey)) {
        duplicateCount++;
      } else {
        const suspected = amount > 5000000;
        supectedsCount += suspected ? 1 : 0;
        validOperations.push(new Operation(from, to, amount, suspected));
        seenOperations.add(operationKey);
      }
    }

    return {
      validOperations,
      invalidSummary: {
        file: fileName,
        negativeCount,
        duplicateCount,
        supectedsCount,
      },
    };
  }
}

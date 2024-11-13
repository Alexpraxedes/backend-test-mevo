import { Operation } from '../../../../src/domain/models/operation.model';
import { OperationDomainService } from '../../../../src/domain/services/operation-domain.service';

describe('OperationDomainService', () => {
  let service: OperationDomainService;

  beforeEach(() => {
    service = new OperationDomainService();
  });

  it('should process valid operations', () => {
    const data = [
      new Operation('Alice', 'Bob', 100),
      new Operation('Charlie', 'Dave', 200),
    ];
    const { validOperations, invalidSummary } = service.processOperations(
      data,
      'file.csv',
    );

    expect(validOperations).toHaveLength(2);
    expect(invalidSummary.negativeCount).toBe(0);
    expect(invalidSummary.duplicateCount).toBe(0);
  });

  it('should detect suspected operations', () => {
    const data = [
      new Operation('Alice', 'Bob', 6000000),
      new Operation('Charlie', 'Dave', 200000),
      new Operation('Eve', 'Frank', 10000000),
    ];

    const { validOperations, invalidSummary } = service.processOperations(
      data,
      'file.csv',
    );

    const suspectedOperations = validOperations.filter((op) => op.suspected);

    expect(suspectedOperations).toHaveLength(2);
    expect(invalidSummary.supectedsCount).toBe(2);
    expect(suspectedOperations[0].amount).toBe(6000000);
    expect(suspectedOperations[1].amount).toBe(10000000);
  });

  it('should detect duplicate operations', () => {
    const data = [
      new Operation('Alice', 'Bob', 100),
      new Operation('Alice', 'Bob', 100),
    ];
    const { validOperations, invalidSummary } = service.processOperations(
      data,
      'file.csv',
    );

    expect(validOperations).toHaveLength(1);
    expect(invalidSummary.duplicateCount).toBe(1);
  });

  it('should detect negative operations', () => {
    const data = [
      new Operation('Alice', 'Bob', 100),
      new Operation('Alice', 'Bob', -100),
    ];
    const { validOperations, invalidSummary } = service.processOperations(
      data,
      'file.csv',
    );

    expect(validOperations).toHaveLength(1);
    expect(invalidSummary.negativeCount).toBe(1);
  });
});

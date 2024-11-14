import { CsvParser } from 'nest-csv-parser';
import { UploadOperationsCommand } from '../../../../src/application/commands/upload-operations.command';
import { OperationDomainService } from '../../../../src/domain/services/operation-domain.service';
import { PrismaOperationRepository } from '../../../../src/infrastructure/database/prisma/operation.prisma.repository';

describe('UploadOperationsCommand', () => {
  let command: UploadOperationsCommand;
  let domainService: OperationDomainService;
  let repository: PrismaOperationRepository;

  beforeEach(() => {
    domainService = new OperationDomainService();
    repository = {
      createManyValidOperations: jest.fn(),
      createInvalidOperation: jest.fn(),
    } as any;
    command = new UploadOperationsCommand(
      new CsvParser(),
      domainService,
      repository,
    );
  });

  it('should return an error message if the file header is invalid', async () => {
    const file = { buffer: Buffer.from('invalid;header\n') } as any;

    await expect(command.execute(file)).resolves.toEqual({
      message: 'Arquivo com formato inválido de dados!',
      status: 'error',
    });
  });
});

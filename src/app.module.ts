import { Module } from '@nestjs/common';
import { CsvParser } from 'nest-csv-parser';
import { UploadOperationsCommand } from './application/commands/upload-operations.command';
import { OperationDomainService } from './domain/services/operation-domain.service';
import { UserService } from './domain/services/user.service';
import { PrismaOperationRepository } from './infrastructure/database/prisma/operation.prisma.repository';
import { PrismaUserRepository } from './infrastructure/database/prisma/user.prisma.repository';
import { OperationController } from './presentation/controllers/operation.controller';
import { UserController } from './presentation/controllers/user.controller';

@Module({
  imports: [],
  controllers: [OperationController, UserController],
  providers: [
    CsvParser,
    UploadOperationsCommand,
    OperationDomainService,
    PrismaOperationRepository,
    UserService,
    { provide: 'UserRepository', useClass: PrismaUserRepository },
  ],
})
export class AppModule {}

import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UploadOperationsCommand } from '../../application/commands/upload-operations.command';
import { UploadOperationDto } from '../dtos/upload-operation.dto';

@Controller('operations')
export class OperationController {
  constructor(
    private readonly uploadOperationsCommand: UploadOperationsCommand,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadOperations(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const uploadOperationDto = plainToInstance(UploadOperationDto, { file });
    const errors = await validate(uploadOperationDto);

    if (errors.length > 0) {
      throw new BadRequestException(
        'Arquivo inválido ou ausente. Deve ser um arquivo CSV.',
      );
    }

    return await this.uploadOperationsCommand.execute(file);
  }
}

import { IsNotEmpty } from 'class-validator';
import { IsMimeType } from '../validators/custom-validators';

export class UploadOperationDto {
  @IsNotEmpty({ message: 'O arquivo é obrigatório.' })
  @IsMimeType(['text/csv', 'application/vnd.ms-excel'], {
    message: 'O arquivo deve estar no formato CSV.',
  })
  file: Express.Multer.File;
}

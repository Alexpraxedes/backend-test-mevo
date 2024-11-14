import { IsOptional } from 'class-validator';
import { IsMimeType } from '../validators/custom-validators';

export class UploadOperationDto {
  @IsOptional()
  @IsMimeType(['text/csv', 'application/vnd.ms-excel'], {
    message: 'O arquivo deve estar no formato CSV.',
  })
  file?: Express.Multer.File;
}

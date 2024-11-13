import { Injectable } from '@nestjs/common';

@Injectable()
export class OperationService {
  uploadCSV(file: Express.Multer.File): any {
    const process_file = file.buffer.toString();

    const header_file = process_file.split('\n', 1)[0];

    if (header_file !== 'from;to;amount') {
      return 'Arquivo com formato inválido de dados!';
    }

    return 'Chegou aqui!';
  }
}

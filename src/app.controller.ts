import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { AppService } from './app.service';
import { OperationService } from './operation/operation.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly operationService: OperationService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadCSV(@UploadedFile() file: Express.Multer.File): any {
    return this.operationService.uploadCSV(file);
  }
}

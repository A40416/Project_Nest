import { Injectable, BadRequestException } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from './entities/file.entity';

interface FileDTO {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File.name) private readonly FileModel: Model<File>,
  ) {}

  async processExcelFile(buffer: Buffer): Promise<File[]> {
    try {
      const workbook = XLSX.read(buffer, { type: 'buffer' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data: FileDTO[] = XLSX.utils.sheet_to_json(sheet, {
        header: ['name', 'email', 'password'],
      });

      if (!data || data.length === 0) {
        throw new BadRequestException('File Excel không chứa dữ liệu hợp lệ.');
      }

      const Files = await this.FileModel.insertMany(data);
      return Files;
    } catch (error) {
      throw new BadRequestException('Xử lý file Excel thất bại.');
    }
  }
}

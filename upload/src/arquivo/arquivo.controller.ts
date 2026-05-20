import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  NotFoundException,
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  UseFilters,
  PayloadTooLargeException
} from '@nestjs/common';
import { ArquivoService } from './arquivo.service';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, basename } from 'path';
import { diskStorage } from 'multer';
import * as fs from 'fs';

// --- ITEM BÔNUS 1: Tratamento de erro customizado para arquivos maiores que 5MB (Status 413) ---
@Catch(PayloadTooLargeException)
export class TamanhoArquivoFilter implements ExceptionFilter {
  catch(exception: PayloadTooLargeException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    response.status(413).json({
      message: 'O arquivo ultrapassa o limite permitido de 5MB.',
      error: 'Payload Too Large',
      statusCode: 413,
    });
  }
}

@Controller('arquivo')
export class ArquivoController {
  constructor(private readonly arquivoService: ArquivoService) { }

  @Post('upload')
  @UseFilters(new TamanhoArquivoFilter())
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './drive',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),

      limits: {
        fileSize: 5 * 1024 * 1024 // Limite de 5MB
      },

      // ITEM BÔNUS 2: Validação de formatos e retorno HTTP 400 Bad Request
      fileFilter: (req, file, callback) => {
        const formatosPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/tiff'];

        if (!formatosPermitidos.includes(file.mimetype)) {
          return callback(
            new BadRequestException('O formato de arquivo é inadequado, envie apenas arquivos png, jpeg, jpg e tiff'),
            false
          );
        }

        callback(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { message: 'Upload realizado com sucesso!', arquivo: file.filename };
  }

  @Get()
  findAll() {
    return this.arquivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arquivoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArquivoDto: UpdateArquivoDto) {
    return this.arquivoService.update(+id, updateArquivoDto);
  }

  // ITEM BÔNUS 3: Remoção do arquivo por nome e tratamento de erro 404
  @Delete(':nome')
  remove(@Param('nome') nome: string) {
    const nomeSeguro = basename(nome); 
    const caminhoArquivo = `./drive/${nomeSeguro}`;

    if (!fs.existsSync(caminhoArquivo)) {
      throw new NotFoundException('O arquivo solicitado não foi encontrado no servidor.');
    }

    fs.unlinkSync(caminhoArquivo);

    return { message: 'Arquivo removido com sucesso!' };
  }
}
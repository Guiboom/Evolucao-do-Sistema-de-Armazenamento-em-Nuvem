import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ArquivoModule } from './arquivo/arquivo.module'; 

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
      serveRoot: '/arquivos', 
    }),
    ArquivoModule,
  ],
})
export class AppModule {}
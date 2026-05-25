import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Foto {
  filename: string;
  size: number;
  criado?: string;
}

// Interface para bater com o objeto exato do JSON do professor
export interface ApiResponse {
  total: number;
  files: Foto[];
}

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  private http = inject(HttpClient);
  private readonly URL_API = 'http://localhost:3000/arquivo';

  fotos = signal<Foto[]>([]);
  isLoading = signal<boolean>(false);

  listarFotos(): void {
    this.isLoading.set(true);
    // Tipamos o GET com a ApiResponse para capturar a propriedade .files
    this.http.get<ApiResponse>(this.URL_API).subscribe({
      next: (resposta) => {
        if (resposta && resposta.files) {
          this.fotos.set(resposta.files);
        } else {
          this.fotos.set([]);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar fotos da API:', err);
        this.isLoading.set(false);
      }
    });
  }

  uploadFoto(formData: any): void {
    this.http.post(`${this.URL_API}/upload`, formData).subscribe({
      next: () => {
        console.log('Upload concluído com sucesso!');
        this.listarFotos(); // Atualiza reativamente
      },
      error: (err) => {
        console.error('Erro ao enviar arquivo para o servidor:', err);
      }
    });
  }
}
import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotoService } from './foto.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [CommonModule]
})
export class App implements OnInit {
  private fotoService = inject(FotoService);

  fotos = this.fotoService.fotos; 
  isLoading = this.fotoService.isLoading;
  isDragging = signal(false);

  mensagemFeedback = signal<string | null>(null);
  tipoFeedback = signal<'sucesso' | 'erro'>('sucesso');

  ngOnInit(): void {
    this.fotoService.listarFotos();
  }

  // Previne que o browser abra a imagem se largar fora do sítio correto
  onDragOver(event: DragEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.isDragging.set(false);
  }

  // Captura o Drop de forma robusta e extrai o ficheiro binário
  onDrop(event: DragEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.isDragging.set(false);

    // Garante o acesso aos ficheiros arrastados (DataTransfer)
    const dt = event.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      const file = dt.files[0];
      this.validarEEnderecarArquivo(file);
    } else if (event.target && (event.target as HTMLInputElement).files) {
      // Fallback de segurança para inputs
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        this.validarEEnderecarArquivo(files[0]);
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.validarEEnderecarArquivo(file);
    }
  }

  private validarEEnderecarArquivo(file: File): void {
    // Validação de Tamanho (Limite de 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.mostrarAlerta('O arquivo ultrapassa o limite permitido de 5MB.', 'erro');
      return;
    }

    // Validação de Formato
    const formatosAceitos = ['image/png', 'image/jpeg', 'image/jpg', 'image/tiff'];
    if (!formatosAceitos.includes(file.type)) {
      this.mostrarAlerta('Formato inadequado! Envie apenas PNG, JPEG, JPG ou TIFF.', 'erro');
      return;
    }

    // Cria o payload binário idêntico ao Insomnia
    const formData = new FormData();
    formData.append('file', file); 

    this.mensagemFeedback.set('Sincronizando arquivo com o servidor...');
    this.tipoFeedback.set('sucesso');

    // Dispara a rota POST do HttpClient
    this.fotoService.uploadFoto(formData);
    
    // Força a atualização visual na interface
    setTimeout(() => {
      this.mostrarAlerta(`Upload de "${file.name}" realizado com sucesso!`, 'sucesso');
    }, 1200);
  }

  private mostrarAlerta(mensagem: string, tipo: 'sucesso' | 'erro'): void {
    this.mensagemFeedback.set(mensagem);
    this.tipoFeedback.set(tipo);

    setTimeout(() => {
      this.mensagemFeedback.set(null);
    }, 4000);
  }
}
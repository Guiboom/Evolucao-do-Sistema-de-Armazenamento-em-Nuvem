# 🚀 Evolução do Sistema de Armazenamento em Nuvem

Uma API REST construída com NestJS para upload, listagem e exclusão de arquivos em armazenamento local. O projeto está preparado para evoluções futuras, como integração com bancos de dados e serviços em nuvem.

---

## 💻 Pré-requisitos

Antes de executar o projeto, verifique se você possui:

* Node.js 18 ou superior
* npm
* Uma ferramenta para testar APIs, como Postman, Insomnia ou Thunder Client

---

## 🛠️ Instalação e Execução Local

Execute os comandos abaixo a partir da pasta raiz do repositório para configurar o backend NestJS:

```bash
git clone https://github.com/Guiboom/Evolucao-do-Sistema-de-Armazenamento-em-Nuvem
cd Evolucao-do-Sistema-de-Armazenamento-em-Nuvem/upload
npm install
npm run start:dev
```

A aplicação backend iniciará em `http://localhost:3000`.

### Instalação do Frontend Angular

Se você também quiser executar o frontend Angular, siga estes passos a partir da raiz do repositório:

```bash
cd frontend
npm install
npm run start
```

O frontend Angular será iniciado em `http://localhost:4200` por padrão.

---

## 🧭 Estrutura do Projeto

* O código principal está em `upload/src/`.
* A pasta de armazenamento local é `upload/drive/`.
* `upload/drive/` é criada automaticamente quando necessário.
* O projeto usa NestJS com `@nestjs/platform-express` para upload de arquivos.

---

## 🌐 Base URL

```text
http://localhost:3000
```

---

## 📚 Guia Completo de Endpoints

### 1. GET /

Retorna uma mensagem de boas-vindas.

* Método HTTP: `GET`
* Rota: `/`

#### Exemplo de resposta de sucesso (200 OK)

```json
"Hello World!"
```

---

### 2. POST /arquivo/upload

Envia um arquivo para o servidor e o salva em `upload/drive/`.

* Método HTTP: `POST`
* Rota: `/arquivo/upload`
* Tipo de conteúdo: `multipart/form-data`
* Parâmetros do corpo (FormData):
  * `file` - arquivo a ser enviado

#### Exemplo de resposta de sucesso (201 Created)

```json
{
  "message": "Upload realizado com sucesso!",
  "arquivo": "file-1688123456789.png"
}
```

#### Exemplo de erro: arquivo ausente (400 Bad Request)

```json
{
  "statusCode": 400,
  "message": "Nenhum arquivo enviado.",
  "error": "Bad Request"
}
```

#### Exemplo de erro: formato inválido (400 Bad Request)

```json
{
  "statusCode": 400,
  "message": "O formato de arquivo é inadequado, envie apenas arquivos png, jpeg, jpg e tiff",
  "error": "Bad Request"
}
```

#### Exemplo de erro: arquivo muito grande (413 Payload Too Large)

```json
{
  "message": "O arquivo ultrapassa o limite permitido de 5MB.",
  "error": "Payload Too Large",
  "statusCode": 413
}
```

---

### 3. GET /arquivo

Lista todos os arquivos salvos em `upload/drive/`.

* Método HTTP: `GET`
* Rota: `/arquivo`

#### Exemplo de resposta de sucesso (200 OK)

```json
{
  "total": 2,
  "files": [
    {
      "filename": "file-1688123456789.png",
      "size": 123456,
      "criado": "2026-05-20T12:00:00.000Z"
    },
    {
      "filename": "file-1688123456790.jpg",
      "size": 234567,
      "criado": "2026-05-20T12:05:00.000Z"
    }
  ]
}
```

#### Exemplo de erro (400 Bad Request)

```json
{
  "statusCode": 400,
  "message": "Não foi possivel listar os arquivos"
}
```

---

### 4. GET /arquivo/:id

Retorna uma mensagem placeholder com o ID do arquivo.

* Método HTTP: `GET`
* Rota: `/arquivo/:id`
* Parâmetros de URL:
  * `id` - identificador numérico do arquivo

#### Exemplo de resposta de sucesso (200 OK)

```text
This action returns a #1 arquivo
```

> Observação: esse endpoint ainda não retorna conteúdo de arquivo real. Ele está implementado como placeholder no código atual.

---

### 5. PATCH /arquivo/:id

Atualiza um arquivo de forma placeholder.

* Método HTTP: `PATCH`
* Rota: `/arquivo/:id`
* Parâmetros de URL:
  * `id` - identificador numérico do arquivo
* Corpo JSON:
  * `UpdateArquivoDto` (sem campos definidos atualmente)

#### Exemplo de resposta de sucesso (200 OK)

```text
This action updates a #1 arquivo
```

> Observação: esse endpoint ainda não realiza atualizações reais; por enquanto é apenas um retorno de placeholder.

---

### 6. DELETE /arquivo/:nome

Remove um arquivo existente pelo nome gerado pelo servidor.

* Método HTTP: `DELETE`
* Rota: `/arquivo/:nome`
* Parâmetros de URL:
  * `nome` - nome do arquivo salvo em `upload/drive/`, por exemplo `file-1688123456789.png`

#### Exemplo de resposta de sucesso (200 OK)

```json
{
  "message": "Arquivo removido com sucesso!"
}
```

#### Exemplo de erro (404 Not Found)

```json
{
  "statusCode": 404,
  "message": "O arquivo solicitado não foi encontrado no servidor.",
  "error": "Not Found"
}
```

---

## 🧩 Observações sobre a implementação atual

* Uploads são enviados via `POST /arquivo/upload` e salvos em `upload/drive/`.
* O nome do arquivo salvo é gerado automaticamente pelo servidor.
* O filtro de upload aceita apenas imagens nos formatos `png`, `jpeg`, `jpg` e `tiff`.
* Existe tratamento de exceção para limite de 5 MB.
* Os endpoints `GET /arquivo/:id` e `PATCH /arquivo/:id` são placeholders no código atual.

---

## 🚀 Roadmap de melhorias

* Persistência de metadados em banco de dados (PostgreSQL, MongoDB, etc.)
* Integração com armazenamento em nuvem (AWS S3, Google Cloud Storage)
* Autenticação JWT para restringir upload e acesso
* Endpoint de download direto por nome de arquivo
* Evolução do serviço para gerenciar metadados completos de arquivos

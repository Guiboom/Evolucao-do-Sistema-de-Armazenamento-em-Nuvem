# 🚀 Evolução do Sistema de Armazenamento em Nuvem

Uma API REST construída com NestJS para upload, listagem e exclusão de arquivos em armazenamento local, com estrutura preparada para futuras integrações com serviços em nuvem.

---

## 💻 Pré-requisitos

Antes de iniciar, verifique se você possui:

* Node.js 18 ou superior
* npm
* Uma ferramenta para testar API (Postman, Insomnia, Thunder Client, etc.)

---

## 🛠️ Instalação e Execução Local
Execute os comandos abaixo a partir da pasta raiz do repositório:


1. Inicializando o Backend (Servidor)
Abra o seu terminal e rode os comandos abaixo para baixar o projeto, entrar na pasta do servidor, instalar tudo e ligar a API:

git clone https://github.com/Guiboom/Evolucao-do-Sistema-de-Armazenamento-em-Nuvem
cd Evolucao-do-Sistema-de-Armazenamento-em-Nuvem/upload
npm install
npm run start:dev

A aplicação iniciará em http://localhost:3000.

⚠️ Importante: Deixe esse terminal aberto rodando o servidor! Não feche ele.

2. Inicializando o Frontend (Interface Angular)
Agora, abra uma nova janela ou aba de terminal (para não desligar o servidor do passo anterior), vá até a pasta do frontend e execute os comandos abaixo para instalar o Tailwind CSS e rodar a interface:

cd Evolucao-do-Sistema-de-Armazenamento-em-Nuvem/frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
npm install
npm run start

O frontend iniciará em http://localhost:4200. Abra o seu navegador e acesse esse endereço para ver o sistema rodando!


## 🧭 Observações importantes

* O código principal está em `upload/src/`.
* Os arquivos enviados são salvos em `upload/drive/`.
* O diretório `drive` é criado automaticamente se ainda não existir.
* O limite de upload é de 5 MB por arquivo.
* Formatos aceitos: `image/png`, `image/jpeg`, `image/jpg`, `image/tiff`.

---

## 🌐 Base URL

```text
http://localhost:3000
```

---

## 📚 Guia Completo de Endpoints

### GET /

Retorna uma mensagem de boas-vindas.

* Método HTTP: `GET`
* Rota: `/`

#### Exemplo de resposta de sucesso (200 OK)

```json
"Hello World!"
```

---

### POST /arquivo/upload

Faz upload de um arquivo para o servidor.

* Método HTTP: `POST`
* Rota: `/arquivo/upload`
* Tipo de conteúdo: `multipart/form-data`
* Campo do formulário:
  * `file` - arquivo a ser enviado

#### Exemplo de resposta de sucesso (201 Created)

```json
{
  "message": "Upload realizado com sucesso!",
  "arquivo": "file-1688123456789.png"
}
```

#### Exemplo de resposta de erro (formato inválido, 400 Bad Request)

```json
{
  "statusCode": 400,
  "message": "O formato de arquivo é inadequado, envie apenas arquivos png, jpeg, jpg e tiff",
  "error": "Bad Request"
}
```

#### Exemplo de resposta de erro (arquivo muito grande, 413 Payload Too Large)

```json
{
  "message": "O arquivo ultrapassa o limite permitido de 5MB.",
  "error": "Payload Too Large",
  "statusCode": 413
}
```

#### Exemplo de resposta de erro (arquivo ausente, 400 Bad Request)

```json
{
  "statusCode": 400,
  "message": "Nenhum arquivo enviado.",
  "error": "Bad Request"
}
```

---

### GET /arquivo

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

#### Exemplo de resposta de erro (400 Bad Request)

```json
{
  "statusCode": 400,
  "message": "Não foi possivel listar os arquivos"
}
```

---

### GET /arquivo/:id

Retorna um texto placeholder indicando o ID do arquivo.

* Método HTTP: `GET`
* Rota: `/arquivo/:id`
* Parâmetros de URL:
  * `id` - identificador numérico do arquivo

#### Exemplo de resposta de sucesso (200 OK)

```text
This action returns a #1 arquivo
```

---

### PATCH /arquivo/:id

Atualiza informações de arquivo (implementação atual é placeholder).

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

---

### DELETE /arquivo/:nome

Remove um arquivo existente pelo nome salvo em `upload/drive/`.

* Método HTTP: `DELETE`
* Rota: `/arquivo/:nome`
* Parâmetros de URL:
  * `nome` - nome do arquivo gerado pelo servidor, por exemplo `file-1688123456789.png`

#### Exemplo de resposta de sucesso (200 OK)

```json
{
  "message": "Arquivo removido com sucesso!"
}
```

#### Exemplo de resposta de erro (404 Not Found)

```json
{
  "statusCode": 404,
  "message": "O arquivo solicitado não foi encontrado no servidor.",
  "error": "Not Found"
}
```

---

## 🧩 Observações sobre a implementação atual

* A rota de upload salva arquivos em `upload/drive` com nome único gerado pelo servidor.
* O projeto cria automaticamente a pasta `drive` se ela ainda não existir.
* Os endpoints `GET /arquivo/:id` e `PATCH /arquivo/:id` existem, mas retornam mensagens placeholder no estado atual do código.

---

## 🚀 Roadmap de melhorias

* Persistência de metadados em banco de dados (PostgreSQL, MongoDB, etc.)
* Integração com armazenamento em nuvem (AWS S3, Google Cloud Storage)
* Autenticação JWT para restringir upload e acesso
* Endpoint de download direto por nome de arquivo
* Evolução do serviço para gerenciar metadados completos de arquivos

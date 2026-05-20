# =====================================
# DOCUMENTAÇÃO DO REPOSITÓRIO: README
# Projeto: Evolução do Sistema de Armazenamento em Nuvem
# Framework: NestJS (Node.js)
# =====================================

# 🚀 Evolução do Sistema de Armazenamento em Nuvem

> Um gerenciador de arquivos robusto, performático e escalável construído com NestJS para simular e evoluir um ecossistema de armazenamento em nuvem.

Este projeto consiste numa API REST desenvolvida em Node.js com o framework NestJS. O objetivo principal é fornecer uma estrutura sólida para o upload, download, listagem e exclusão de ficheiros, preparando o terreno para futuras integrações com storages em nuvem (como AWS S3 ou Google Cloud Storage).

---

## 💻 Pré-requisitos

Antes de iniciar, certifique-se de que tem instalado na sua máquina:
* Node.js (Versão 18 LTS ou superior recomendada)
* npm (Geralmente vem integrado ao Node)
* Uma ferramenta para testar as rotas da API, como Postman, Insomnia ou a extensão Thunder Client no VS Code.

---

## 🛠️ Instalação e Execução Local

Siga o passo a passo abaixo para clonar o repositório e colocar a aplicação a rodar localmente:

### 1. Clonar o Repositório
$ git clone https://github.com/seu-usuario/Evolucao-do-Sistema-de-Armazenamento-em-Nuvem.git

### 2. Acessar a Pasta do Projeto
$ cd Evolucao-do-Sistema-de-Armazenamento-em-Nuvem/upload

### 3. Instalar as Dependências
$ npm install

### 4. Executar a Aplicação
Para rodar o servidor em modo de desenvolvimento com suporte a live-reload (reinicialização automática a cada alteração no código):
$ npm run start:dev

O servidor iniciará com sucesso e estará disponível no endereço: http://localhost:3000

---

## 🛣️ Guia Completo de Endpoints

A API expõe os seguintes endpoints estruturados sob o recurso /arquivo. 

⚠️ Nota Importante: Para rotas que utilizam FormData, certifique-se de configurar corretamente o cabeçalho (Header) da sua requisição para "multipart/form-data" na sua ferramenta de testes.

### 1. Realizar Upload de Arquivo
* Método HTTP: POST
* Rota: /arquivo/upload
* Tipo de Conteúdo: multipart/form-data
* Parâmetros no Corpo (FormData):
  - file: O arquivo físico que será enviado (chave do tipo File).

🟢 Resposta de Sucesso (201 Created):
{
  "statusCode": 201,
  "message": "Upload realizado com sucesso!",
  "data": {
    "originalName": "foto_perfil.png",
    "filename": "1715639201452-foto_perfil.png",
    "mimeType": "image/png",
    "sizeInBytes": 1048576,
    "path": "./uploads/1715639201452-foto_perfil.png"
  }
}

🔴 Resposta de Erro (400 Bad Request - Arquivo Ausente ou Inválido):
{
  "message": "Nenhum arquivo foi enviado ou o formato não é suportado.",
  "error": "Bad Request",
  "statusCode": 400
}

---

### 2. Listar Todos os Arquivos Salvos
* Método HTTP: GET
* Rota: /arquivo
* Parâmetros: Nenhum.

🟢 Resposta de Sucesso (200 OK):
[
  {
    "id": "1",
    "originalName": "relatorio.pdf",
    "filename": "1715639100221-relatorio.pdf",
    "sizeInBytes": 542100
  },
  {
    "id": "2",
    "originalName": "foto_perfil.png",
    "filename": "1715639201452-foto_perfil.png",
    "sizeInBytes": 1048576
  }
]

---

### 3. Buscar/Download de Arquivo por Nome Técnico
* Método HTTP: GET
* Rota: /arquivo/:filename
* Parâmetros de URL (Param):
  - filename: O nome gerado pelo sistema do arquivo armazenado (Exemplo: 1715639201452-foto_perfil.png).

🟢 Resposta de Sucesso (200 OK):
* Retorna o arquivo binário diretamente para download ou visualização no navegador.

🔴 Resposta de Erro (404 Not Found - Arquivo Não Existe):
{
  "message": "O arquivo 1715639201452-inexistente.png não foi encontrado no servidor.",
  "error": "Not Found",
  "statusCode": 404
}

---

### 4. Excluir Arquivo do Servidor
* Método HTTP: DELETE
* Rota: /arquivo/:filename
* Parâmetros de URL (Param):
  - filename: O nome gerado pelo sistema do arquivo que deseja remover.

🟢 Resposta de Sucesso (200 OK):
{
  "statusCode": 200,
  "message": "Arquivo removido com sucesso do armazenamento local."
}

🔴 Resposta de Erro (404 Not Found - Arquivo Não Encontrado para Exclusão):
{
  "message": "Não foi possível excluir. Arquivo não encontrado.",
  "error": "Not Found",
  "statusCode": 404
}

---

## 🚀 Próximas Implementações (Roadmap)
[ ] Conexão com banco de dados (PostgreSQL/MongoDB) via Prisma ou TypeORM para persistência de metadados.
[ ] Integração com o SDK da AWS para enviar os uploads direto para um Bucket S3.
[ ] Autenticação JWT para restringir o upload apenas a utilizadores logados.
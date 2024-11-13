# Projeto Backend Test - Mevo

Este é um projeto backend desenvolvido com **NestJS** e **Prisma ORM** para gerenciar operações e validações de arquivos CSV de maneira segura e escalável. Atualmente, o projeto ainda não segue completamente a estrutura planejada, mas estamos avançando para uma arquitetura mais modular e escalável, baseada em **Domain-Driven Design (DDD)** e **Clean Code**.

## Estrutura Planejada

O projeto será estruturado com as seguintes camadas:

```
src
├── application
│   ├── commands         # Serviços para manipulação de dados e execução de comandos
│   └── queries          # Serviços para consultas e recuperação de dados
├── domain
│   ├── models           # Entidades e objetos de valor, representando o núcleo do domínio
│   ├── repositories     # Interfaces de repositórios, seguindo o padrão Repository
│   └── services         # Lógica de domínio que envolve mais de uma entidade
├── infrastructure
│   ├── config           # Configurações de ambiente e infraestrutura (como banco de dados)
│   ├── database
│   │   ├── prisma       # Prisma client e esquemas
│   │   └── migrations   # Migrações de banco de dados
│   ├── logging          # Configurações e implementação de logs
│   └── security         # Middleware e utilitários de segurança (ex: autenticação)
└── presentation
    ├── controllers      # Controladores para rotas da API
    ├── dtos             # Data Transfer Objects usados nos controladores
    └── validators       # Validação de dados de entrada
tests
├── application          # Testes unitários para a camada de aplicação
├── domain               # Testes unitários para a camada de domínio
├── infrastructure       # Testes unitários para a infraestrutura
└── presentation         # Testes unitários para os controladores
```

### Status Atual

Atualmente, o projeto não está completamente configurado de acordo com essa estrutura, mas este é o objetivo após as implementações e refatorações necessárias. Esta estrutura visa:

- **Testabilidade e Manutenibilidade**
- **Eficiência e Escalabilidade**
- **Modularidade e Reutilização de Código**
- **Segurança, com foco em boas práticas de validação de entrada e autenticação**

## Funcionalidades

- Upload de arquivos CSV com dados de operações.
- Validação de dados (ex: operações duplicadas, valores negativos).
- Registro de operações válidas e inválidas no banco de dados.
- Acompanhamento das tabelas por meio do Prisma Studio.

## Tecnologias

- **NestJS**: Framework utilizado para organizar o código de forma modular e escalável.
- **Prisma ORM**: Utilizado para interagir com o banco de dados MySQL, facilitando a definição e manipulação de esquemas.
- **Docker**: A aplicação está dockerizada para um ambiente de desenvolvimento e produção consistente.
- **Prisma Studio**: Interface visual para acompanhar as tabelas do banco de dados.

## Estrutura de Docker

O projeto utiliza **Docker** e **Docker Compose** para criar e gerenciar os serviços necessários para a aplicação. A configuração atual inclui:

- **App**: Servidor NestJS para o backend.
- **DB**: Banco de dados MySQL, configurado e persistente por meio de volumes.
- **Prisma Studio**: Para visualizar e gerenciar as tabelas do banco de dados.

Para iniciar o projeto com Docker:

```bash
docker-compose up --build
```

Após iniciar o projeto, você pode acessar o Prisma Studio na porta `5555` para acompanhar e gerenciar os dados:

```bash
docker-compose exec app npx prisma studio
```

## Estrutura Atual do Código

A estrutura atual do código ainda está em fase de refatoração para atingir o padrão desejado de modularidade. Aqui estão alguns dos principais arquivos e pastas atuais:

- `src/application`: Camada de aplicação, que inclui comandos e queries.
- `src/domain`: Contém os modelos e repositórios (em construção) que representam o domínio.
- `src/infrastructure`: Configurações de banco de dados, segurança e logging.
- `src/presentation`: Controladores de API, DTOs e validação de entrada.
- `tests`: Estrutura de testes para cobertura completa das funcionalidades.

## Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="mysql://root:root@mevo-db:3306/mevo-test"
MYSQLDB_ROOT_PASSWORD=root
MYSQLDB_DATABASE=mevo-test
MYSQLDB_LOCAL_PORT=3306
MYSQLDB_DOCKER_PORT=3306
NODE_LOCAL_PORT=3000
NODE_DOCKER_PORT=3000
```

## Roadmap

1. **Refatoração da Estrutura**: Reorganizar pastas e módulos conforme a estrutura planejada.
2. **Testes**: Adicionar cobertura de testes unitários e de integração.
3. **Melhorias em Segurança**: Adicionar validação de entrada robusta e autenticação para endpoints sensíveis.
4. **Documentação**: Criar documentação detalhada para endpoints da API.

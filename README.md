# RocketSeat Workshop 2020 - Ambiente containerizado

Nesse workshop vamos aprender a utilizar [Docker](https://www.docker.com/) e [docker-compose](https://docs.docker.com/compose/)
para criar um ambiente de desenvolvimento containerizado.

Isso será feito com o objetivo de facilitar o desenvolvimento, testes automatizados e integração contínua de aplicações
que dependem de serviços de infraestrutura externos - como bancos de dados e cache.

Vamos ver que com o uso dessas ferramentas ganharemos:
- Não precisar instalar essas dependências em nosso ambiente local
- Não precisar instalar essas dependências remotamente e disponibilizá-las na rede
- Não precisar compartilhar essas dependências entre colaboradores
- Não precisar se preocupar com o ciclo de vida dessas dependências (considerá-las efêmeras)

## A aplicação

A aplicação consiste de uma API REST em [Node.JS](https://nodejs.org/en/).

Essa API será um serviço que gerencia posts de texto do tipo `tweet` (inspirado no [twitter](https://twitter.com/)):
- Criação de um _tweet_ que será identificado por um [uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier) versão 4
- Acrescentar _likes_ nos _tweets_ cadastrados
- Listar os top _tweets_ com mais _likes_

### O Workshop

O workshop será dividido nas seguintes etapas:

1. Apresentação da aplicação
    - familiarização com o código fonte, arquitetura de software, testes
    - funcionalidades utilizam banco de dados em memória

2. Adição de bancos de dados [MongoDB](https://www.mongodb.com/)
    - Como utilizar o _docker-compose_ para "subir" o banco localmente (desenvolvimento local, testes automatizados)
        - utilizando rede virtual
        - expondo na máquina host

3. Adição de serviço de cache [Redis](https://redis.io/)
    - Como utilizar o _docker-compose_ para "subir" o serviço de cache localmente (desenvolvimento local, testes automatizados)
        - Utilizando rede virtual
        - expondo na máquina host

4. Conectando a aplicação
    - Testes
    - Desenvolvimento
        - Como utilizar o _docker-compose_ para "subir" a aplicação localmente conectando com os recursos
        - Expondo na máquina host

5. Criar _pipeline_ de _CI_ com [Github Actions](https://github.com/features/actions)
    - Com etapa de testes de integração
    - **importante**: o foco não é aprender _github actions_ mas sim como utilizar containers pra facilitar o processo

6. Considerações finais

7. Q&A

## Pré-requisitos

**Disclaimer**: O setup não foi testado em sistema operacional _Windows_ então pode ser que não funcione.
Recomendo a utilização de alguma distribuição _Linux_ ou _Mac_.

Para conseguir acompanhar o workshop será necessário ter no ambiente
- [Docker](https://www.docker.com/) e [docker-compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)
- Conta no [Github](https://github.com/)
- Última versão de [Node.JS](https://nodejs.org/en/) (14+)
  - recomendo a utilização do [NVM](https://github.com/nvm-sh/nvm)
- Preparar sua versão do repositório
  - [fork](https://github.com/rodrigobotti/rs-ws-2020-env/fork) desse repositório
  - _git clone_ do repositório
  - executar no diretório do projeto
  ```sh
  # caso tenha optado pelo uso do nvm
  # (a versão de node vem do arquivo .nvmrc na raíz)
  nvm install
  nvm use

  # instalar as dependências
  npm install
  npm run postinstall

  # verificar:
  
  # executar testes unitários e de integração
  # como falta o mongodb e o redis, deve falhar com timeout de conexão
  npm test

  # tentar subir a aplicação localmente em modo debug
  # como falta o mongodb e o redis, deve falhar por erro de conexão
  npm run start:dev # gerará uma linha de log com "Application started successfully in port 3000"
  ```

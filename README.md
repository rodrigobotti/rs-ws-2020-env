<img src="https://storage.googleapis.com/golden-wind/experts-club/capa-github.svg" />

# Containerizando o ambiente com docker-compose

Nesse workshop vamos aprender a utilizar containers para criar dependências de infra-estrutura das nossas aplicações (como bancos de dados, serviços de cache).

Utilizaremos [Docker](https://www.docker.com/) como nossa ferramenta de containerização e utilizaremos o [docker-compose](https://docs.docker.com/compose/) para orquestrar o ciclo de vida de nossos containers.

Aprenderemos algumas abordagens para conectar nossa aplicação localmente tanto para executá-la quanto para rodar testes integrados.

No final utilizaremos essas tecnologias também para criação de um pipeline de integração contínua.

Vamos ver que com o uso dessas ferramentas ganharemos:
- Não precisar instalar essas dependências em nosso ambiente local
- Não precisar instalar essas dependências remotamente e disponibilizá-las na rede
- Não precisar compartilhar essas dependências entre colaboradores
- Não precisar se preocupar com o ciclo de vida dessas dependências (considerá-las efêmeras)

## O Workshop

O workshop será dividido nas seguintes etapas:

1. Apresentação da aplicação
    - familiarização com o código fonte, arquitetura de software, testes

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

### A aplicação

A aplicação consiste de uma API REST em [Node.JS](https://nodejs.org/en/).

Essa API será um serviço que gerencia posts de texto do tipo `tweet` (inspirado no [twitter](https://twitter.com/)):
- Criação de um _tweet_ que será identificado por um [uuid](https://en.wikipedia.org/wiki/Universally_unique_identifier) versão 4
- Acrescentar _likes_ nos _tweets_ cadastrados
- Listar os top _tweets_ com mais _likes_

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

  # verificar:
  
  # executar testes unitários e de integração
  # como falta o mongodb e o redis, deve falhar com timeout de conexão
  npm test

  # tentar subir a aplicação localmente em modo debug
  # como falta o mongodb e o redis, deve falhar por erro de conexão
  npm run start:dev
  ```

## Pós workshop

### Código produzido
Todo código produzido nesse workshop está disponível no branch `cheat-sheet`.

### Lição de casa

Durante o workshop, eu "expliquei" (nem sei se pode chamar disso) de forma bem grosseira o que é um container.
Recomendo [consultar a fonte](https://www.docker.com/resources/what-container) pra saber de fato o que são e a tecnologia de fato por trás.

Além disso, a parte de networking foi explicada no modo "vamos acreditar que funciona" e foram utilizadas abordagens específicas.
Recomendo a leitura da [documentação oficial](https://www.docker.com/resources/what-container) para esse assunto,
tanto para entender os detalhes quanto para entender todo o leque de opções desse assunto vasto.

#### Exercícios

**Disclaimer**: originalmente o workshop tinha sido feito para que construíssemos features da aplicação ao mesmo tempo que integrassemos com containers.
Primeiro implementaríamos as features de _criação_ e _adicionar likes_ e finalmente a de _top com mais likes_ junto com seus respectivos testes.
TL;DR: originalmente, produziríamos código de aplicação no workshop também.

Caso você queira mexer um pouco na aplicação, você pode implementar os seguintes exercícios:

1 . Criar testes que estão faltando 

1.1 . Unitários para os componentes da funcionalidade _adicionar likes_

1.2 . De integração para a funcionalidade de _adicionar likes_

1.3 . De integração para a funcionalidade de _top tweets com mais likes_

2 . No pipeline de CI, testar com check de cobertura de código

3 . Criar `Makefile` para agrupar tarefas utilizando `make`

3.1 . Task `test`: cria infraestrutura + executa testes com check de cobertura + derruba a infraestrutura

3.2 . Task `run`: cria infraestrura + inicia a aplicação

3.3 . Modificar o pipeline de CI para utilizar a task `test`

## Expert

| [<img src="https://avatars.githubusercontent.com/u/5365992?v=4" width="75px">](https://github.com/rodrigobotti) |
| :-: |
| [Rodrigo Botti](https://github.com/rodrigobotti) |

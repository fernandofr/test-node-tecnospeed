# Indice

* [Recurso](#recurso)
* [Instalação](#instalação)
* [Começando](#começando)

# Recurso

* Administre o caixa da sua loja, cadastrando as entradas e saidas categorizadas.

# Instalação

*Você precisa ter instalado o [Node.js](https://nodejs.org/en/download/) e [Yarn](https://yarnpkg.com/) primeiro, em seguida para clonar o projeto, execute o comando abaixo:*

```git clone https://github.com/fernandofr/test-node-tecnospeed.git```

**Instalar dependências**

Após clonar o projeto navegue para dentro da pasta clonada e rode o comando, para baixar e instalar todas dependências.

```yarn```

Crie suas variáveis ​​de ambiente com base nos exemplos de ```.env.example```

```cp .env.example .env```

Após copiar os exemplos, certifique-se de preencher as variáveis ​​com novos valores.

**Configurando base de dados**

Instale o [Postgres](https://www.postgresql.org/) para criar um banco de dados.
Se você tiver o [Docker](https://www.docker.com/) em sua máquina, preencha os valores do ambiente relacionados às configurações do banco de dados e execute os seguintes comandos para criar um contêiner do postgres.

```docker-compose up```

> [Clique aqui para ver o modelo do banco de dados](https://dbdiagram.io/d/5ecc369139d18f5553ffbe12)

# Começando

Após ter o banco criado e condigurado o arquivo `.env`. Execute o comando abaixo para criar as migrations.

```yarn typeorm migration:run```

Após ter criado as migrations, execute o comando abaixo para iniciar o aplicativo em ambiente de desenvolvimento.

```yarn dev:server```

para rodar os testes, rode o comanda abaixo:

```yarn test```

### Rotas da aplicação

Agora que a api esta rodando é possivel consultar as rota.

#### Users
- **`POST /users`**: A rota deve receber `email` e `password` dentro do corpo da requisição. Ao cadastrar um novo usuário, ela deve ser armazenada dentro do seu banco de dados, possuindo os campos `id`, `email`, `password`, `created_at`, `updated_at`.

```json
{
  "id": "uuid",
  "email": "teste@teste.com.br",
  "created_at": "2020-05-27T04:05:36.367Z",
  "updated_at": "2020-05-27T04:05:36.367Z"
}
```

#### sessions
- **`POST /session`**: A rota deve receber `email` e `password` dentro do corpo da requisição. Ao solicitar o token de acesso para poder cadastrar as movimentações, será retornado um objeto o campo `user` que também é um objeto contendo o `id` e `email` do usuario, e o campo com o `token`.

```json
{
  "user": {
    "id": "uuid",
    "email": "teste@teste.com.br"
  },
  "token": "JWT"
}
```

#### Categorys
- **`POST /categorys`**: A rota deve receber um `title` dentro do corpo da requisição. Ao cadastrar uma nova categoria, ela deve ser armazenada dentro do seu banco de dados, possuindo os campos `id`, `email`, `password`, `created_at`, `updated_at`.

```json
{
  "id": "uuid",
  "title": "Alimentação",
  "created_at": "2020-05-27T04:05:36.367Z",
  "updated_at": "2020-05-27T04:05:36.367Z"
}
```

- **`GET /categorys`**: Esta rota deve retornar uma listagem com todas as categorias cadastradas. Essa rota deve retornar um array com o seguinte formato:

```json
[
  {
    "id": "uuid",
    "title": "Alimentação"
  },
  {
    "id": "uuid",
    "title": "Freelance"
  }
]
```

#### Transactions

Para utilizar a rota de `transactions` é necessario estar autenticado na aplicação. Para isto é preciso com o usuário criado solicitar o `token` utilizando a rota de `session`. E informar o `token` no header da requisição.

**Dica**: Após ter o token, no insomnia entre na aba authentication, escolha `Bearer Token` e informe o token. Se preferir no insomnia é possivel definir variáveis https://support.insomnia.rest/article/18-environment-variables **

- **`POST /transactions`**: A rota deve receber `title`, `value`, `type`, e `category` dentro do corpo da requisição, sendo o `type` o tipo do lançamento, que deve ser `entrada` ou `saida`. Ao cadastrar uma nova transação, ela deve ser armazenada dentro do seu banco de dados, possuindo os campos `id`, `title`, `value`, `type`, `category_id`, `created_at`, `updated_at`.

```json
{
  "id": "uuid",
  "title": "Salário",
  "value": 3000,
  "type": "entrada",
  "category_id": "uuid",
  "created_at": "2020-05-27T04:06:55.922Z",
  "updated_at": "2020-05-27T04:06:55.922Z"
}
```

- **`GET /transactions`**: Essa rota deve retornar uma listagem com todas as transações cadastradas, junto com o valor total da soma de entradas e saida. Essa rota deve retornar um objeto o seguinte formato:

```json
{
  "total": 2950,
  "transactions": [
    {
      "id": "uuid",
      "title": "Café da tarde",
      "type": "saida",
      "value": "50",
      "created_at": "2020-05-27T04:06:31.498Z",
      "category": {
        "id": "uuid",
        "title": "Alimentação"
      }
    },
    {
      "id": "uuid",
      "title": "Salário",
      "type": "entrada",
      "value": "3000",
      "category_id": "uuid",
      "created_at": "2020-05-27T04:06:55.922Z",
      "category": {
        "id": "uuid",
        "title": "Freelance"
      }
    }
  ]
}
```
- **`DELETE /transactions/:id`**: A rota deve deletar uma transação com o `id` presente nos parâmetros da rota;

### Testando api

Para testar a api recomendo utilizar o [Insomnia](https://insomnia.rest/) que é um cliente http que nos permite fazer requisições na api `Get`, `Post`, `Delete`, `Put`. E é bem simples de ser utilizado. Caso utilize um sistema 32 bits recomendo utilizar o [Postman](https://www.postman.com/).

Após baixar o insomnia, import o arquivo `insomnia.json` que esta na raiz do projeto. Este arquivo possui as rotas cadastradas para facilitar o teste na api.
Caso tenha duvida de como fazer consulte https://support.insomnia.rest/article/52-importing-and-exporting-data.

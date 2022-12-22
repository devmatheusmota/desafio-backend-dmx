# Desafio back-end

O objetivo é criar uma aplicação web com autenticação via JWT (Json Web Token), e uma API para listar cervejarias filtradas por requisição baseada no openbrewerydb.

Para a parte de servidor da Web, você pode usar
- [Express](https://expressjs.com/)
- [Fastify](https://www.fastify.io/)
- [Koa](https://koajs.com/)

Inclua um middleware para fazer login em todas as requisições
- https://github.com/koajs/logger
- https://github.com/expressjs/morgan

O endpoint de login ( `POST /login` ) deve retornar um token JWT assinado com username/password corretos.

O token deve ser assinado com https://github.com/auth0/node-jsonwebtoken e o signing secret deve ser fornecido via config.

O corpo da requisição POST deve conter `{ username: string, password: string }`.

A interface a seguir descreve o usuário.

``` { id: string; username: string; password: string; } ```

Os usuários (com a interface fornecida) devem ser armazenados em um banco de dados. Você pode escolher qualquer banco de dados que desejar em sua solução, mas as credenciais devem ser fornecidas via config.

O endpoint das cervejarias ( `GET /breweries`) deve ser protegido por um middleware personalizado.
O middleware deve validar o token e verificar se o usuário existe no banco de dados.

A fonte de dados deve ser o OpenBreweryDB https://www.openbrewerydb.org/

Use a API de pesquisa para consultar os dados `https://api.openbrewerydb.org/breweries/search?query=dog`

Para requisições, utilize o Axios:
- https://github.com/axios/axios

O parâmetro de pesquisa deve ser fornecido nos parâmetros de consulta ( `GET /breweries?query=dog` )

Se o usuário não for autenticado em `GET /breweries` retorne `401`.

Se o usuário não forneceu um parâmetro de consulta, retorne os dados de `https://api.openbrewerydb.org/breweries`

Se o usuário chamou qualquer outro `POST /login` ou `GET /breweries` retorna `404`.


Por favor, utilize typescript, incluímos linting e testing neste projeto.

Você pode iniciar o projeto com `yarn start`.
Você pode verificar o lint e a formatação do projeto com `yarn lint`.

Se você estiver usando o VSCode, poderá usar estas extensões:
- https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
- https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin

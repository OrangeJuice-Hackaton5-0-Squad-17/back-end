<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
# install modules *Required
$ npm install

# run migrations *Required
$ npx prisma migrate deploy

# sync dataBase with Prisma ORM *Required
$ npx prisma db push

# run all seeds to have basic information at database To run some tests *Required
$ npx prisma db seed
```

## Running the app

```bash

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Run Tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Swagger endpoint

```bash
# swagger
http://localhost:3333/api
```

## Routes:

## TestRoute

```bash
# GET http://localhost:3333/test (to check if backend is up and running!)
no body required
```

## User

```bash
# POST http://localhost:3333/user (to create user)
body:{
  "name": "Marcos Mantovani", STRING;
  "email": "teste@teste.com", STRING;
  "password": "pass@sword123*" STRING;
}
```

```bash
# PATCH http://localhost:3333/user/:id (to update user info) access_token required
# header: Authorization: Bearer "access_token"
body:{
  "name": "New Name", STRING
  "email": "newemail@teste.com", STRING;
  "password": "new@pass123*" STRING;
}
```

```bash
# GET http://localhost:3333/user/:id (to get user account information) access_token required
# header: Authorization: Bearer "access_token"
no body required
```

```bash
# DELETE http://localhost:3333/user/:id (to delete user account) access_token required
# header: Authorization: Bearer "access_token"
no body required
```

## Autentication

```bash
# POST http://localhost:3333/login (to validate email/password and get access_token)
body:{
  "email": "teste@teste.com", STRING;
  "password": "pass@sword123*" STRING;
}
```

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Marcos Mantovani](https://www.linkedin.com/in/mvmes2/)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
dev

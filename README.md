<p align="center">
    <a href="https://codeclimate.com/github/GeorgePuisha/store-grabber-api/maintainability"><img src="https://api.codeclimate.com/v1/badges/5bb35d5b9602a3848000/maintainability" /></a>
    <a class="badge-align" href="https://www.codacy.com/app/GeorgePuisha/store-grabber-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=GeorgePuisha/store-grabber-api&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/ddbcf467167540bdb02d55eb1d5c206d"/></a>
    <a href="https://circleci.com/gh/GeorgePuisha/store-grabber-api"><img src="https://circleci.com/gh/GeorgePuisha/store-grabber-api/tree/master.svg?style=shield" /></a>
</p>

# Store Grabber

Server part of client-server solution to track [Onliner.by](https://catalog.onliner.by/) prices and to notify user about price changes.

## Getting Started

Clone project to your computer.

```
$ git clone https://github.com/GeorgePuisha/store-grabber-api.git
```
### Prerequisites

To start with Store Grabber, you should have [Node](https://nodejs.org/en/download/package-manager/) installed. Project guaranteed to work with Node `^8.4.0`. It already has [npm](https://github.com/npm/npm), so your version must be up-to-date.

```
$ npm install -g @angular/cli
```

Install [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli).

```
$ npm install -g heroku-cli
```

### Installing

Install all dependencies.

```
$ npm install
```

To run server on localhost type `npm start` in root folder.

```
$ npm start
```

To run server, you should provide it with database connection string. I'm using Heroku environmental variables. To set `DATABASE_URL` you should type:

```
$ heroku config:set DATABASE_URL=postgres://user:password@host:port/database
```

Local server is running using Heroku. Server works on port `3000`.

### Database

You need to have [Sequelize](http://docs.sequelizejs.com/), [pg](https://github.com/brianc/node-postgres) and [pg-hstore](https://github.com/scarney81/pg-hstore) to continue.

Firstly, create `config.json` file in `./server` folder. Fill in data for development & production database connection.

```
{
    "development": {
        "username": "username",
        "password": "username",
         "database": "database",
         "host": "host",
         "port": "5432",
         "dialect": "postgres"
    },

    // test

    "production": {
        "username": "username",
        "password": "password",
        "database": "database",
        "host": "host",
        "port": "5432",
        "dialect": "postgres"
    }
```

Run migration to your development database using [sequelize-cli](https://github.com/sequelize/cli).

```
$ node_modules/.bin/sequelize db:migrate

Loaded configuration file "server/config.json".
Using environment "development".
```

### Running the tests

Config file should contain DATABASE_URL for testing.

```
{
    // development

    "test": {
        "DATABASE_URL": "postgres://user:password@host:port/database"
    }

    // production
}

```

To run tests type `npm test` in root folder.

### Deployment

To deploy with Heroku, visit [official guide page](https://devcenter.heroku.com/articles/git).

Briefly:

```
$ heroku login
Enter your Heroku credentials.
$ heroku create
$ git push heroku master
```

Ensure the app is running.

```
heroku ps:scale web=1
heroku open
```

Some hints:

* Make sure node & npm version are specified in `package.json`;
* Your project should provide a Procfile. [more](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile);
* Easy start with Heroku ["Provision a database"](https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database) article;
* Use [pgAdmin 4](https://www.pgadmin.org/) to administrate Postgres database. [Ubuntu installation](https://romantelychko.com/blog/1585/);
* Article about [Node+Postgres+Sequelize](http://mherman.org/blog/2015/10/22/node-postgres-sequelize/#.WhQ5FxZRVhE) integration.


## Built With

* [Node.js](https://github.com/nodejs/node) - JavaScript runtime for server;
* [npm](https://github.com/npm/npm) - Package manager for JavaScript;
* [Express.js](https://github.com/expressjs/express) - Framework for Node.js.

### Deployment

* [Heroku](https://www.heroku.com/home) - Deployment platform;

### Database

* [Sequelize](http://docs.sequelizejs.com/) - ORM for Node.js;
* [node-postgres](https://github.com/brianc/node-postgres) - PostgreSQL client for Node.js;
* [pg-hstore](https://github.com/scarney81/pg-hstore) - Node.js package for serializing and deserializing JSON data to hstore format.

### Testing

* [Mocha](https://github.com/mochajs/mocha) - JS test framework;
* [Chai](https://github.com/chaijs/chai) - Assertion library for Node.js;
* [chai-http](https://github.com/chaijs/chai-http) - HTTP integration testing with Chai assertions.

## Author

* **George Puisha** - [GeorgePuisha](https://github.com/GeorgePuisha)

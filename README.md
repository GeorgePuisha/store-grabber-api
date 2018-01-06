<p align="center">
    <a href="https://codeclimate.com/github/GeorgePuisha/store-grabber-api/maintainability"><img src="https://api.codeclimate.com/v1/badges/5bb35d5b9602a3848000/maintainability"/></a>
    <a class="badge-align" href="https://www.codacy.com/app/GeorgePuisha/store-grabber-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=GeorgePuisha/store-grabber-api&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/ddbcf467167540bdb02d55eb1d5c206d"/></a>
    <a href="https://circleci.com/gh/GeorgePuisha/store-grabber-api"><img src="https://circleci.com/gh/GeorgePuisha/store-grabber-api/tree/master.svg?style=shield" /></a>
    <a href="https://travis-ci.org/GeorgePuisha/store-grabber-api"><img src="https://travis-ci.org/GeorgePuisha/store-grabber-api.svg?branch=master" /></a>
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

To send e-mails automatically, set Gmail account settings using two environmental variables - `EMAIL_USER` and `EMAIL_PASSWORD`.

... and create `.env` file in root folder for development runs. `.env` file should contain:

```
DATABASE_URL="postgres://user:password@host:port/database",
EMAIL_USER="development@gmail.com",
EMAIL_PASSWORD="development"
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

Application is using [Heroku Scheduler](https://elements.heroku.com/addons/scheduler) addon. To schedule a frequency and time for a job, open the Scheduler dashboard by finding the app in My Apps in Heroku dashboard.

Some hints:

* Make sure node & npm version are specified in `package.json`;
* Your project should provide a Procfile. [more](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile);
* Easy start with Heroku ["Provision a database"](https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database) article;
* Use [pgAdmin 4](https://www.pgadmin.org/) to administrate Postgres database. [Ubuntu installation](https://romantelychko.com/blog/1585/);
* Article about [Node+Postgres+Sequelize](http://mherman.org/blog/2015/10/22/node-postgres-sequelize/#.WhQ5FxZRVhE) integration.
* You should verify your Heroku account in order to use Scheduler addon. It's free but is available only for checked users. [Heroku verification](https://devcenter.heroku.com/articles/account-verification)

## Built With

* [Node.js](https://github.com/nodejs/node) - JavaScript runtime for server;
* [npm](https://github.com/npm/npm) - Package manager for JavaScript;
* [Express.js](https://github.com/expressjs/express) - Framework for Node.js;
* [Needle.js](https://github.com/tomas/needle) - HTTP request framework for Node.js;
* [Nodemailer](https://github.com/nodemailer/nodemailer) - Node.js framework to send e-mails.

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

## Project Structure

### Files & Folders

```

├── app.js
├── circle.yml
├── package.json
├── package-lock.json
├── Procfile
├── README.md
├── server
│   ├── config.json
│   ├── controllers
│   │   ├── amqp.js
│   │   └── redis.js
│   ├── migrations
│   │   ├── 20171120131951-create-user.js
│   │   └── 20171206174100-create-watched.js
│   ├── models
│   │   ├── index.js
│   │   ├── user.js
│   │   └── watched.js
│   ├── routes
│   │   ├── currency.js
│   │   ├── index.js
│   │   ├── onliner.js
│   │   └── watch.js
│   └── services
│       ├── mailer.js
│       ├── mail.json
│       └──price.js
├── tasks
│   ├── check-price.js
│   └── send-email.js
└── test
    └── test.js
```

### Project Map

Application uses standart triple-level web application design pattern.

Levels:

* Client level. User interaction with the system;
* Server level. Interaction with clients, business logic, data access;
* Database level. Data storage.

```

┌────────────┐      ┌────────────┐      ┌────────────┐
|            |      |            |      |            |
|   Client   | <==> |   Server   | <==> |  Database  |
|            |      |            |      |            |
└────────────┘      └────────────┘      └────────────┘

```

Levels are designed using different technologies:

* Client. Angular 5 + Typescript;
* Server. Built with Node.js using Express.js & Sequelize;
* Database. Data storage is provided by PostgreSQL & Redis.

```
    Client             Server             Database
┌────────────┐      ┌───────────┐      ┌────────────┐
|            |      |           |      |            |
|            |      |           |      | PostgreSQL |
|  Angular 5 | <==> |  Node.js  | <==> |     +      |
|            |      |           |      |   Redis    |
|            |      |           |      |            |
└────────────┘      └───────────┘      └────────────┘

```

Full structure with interactions & data passing will look like this:

```

╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                    Client                                                 ║
║┌──────────────────────────────────┐┌──────────────────────────────────┐┌─────────────────────────────────┐║
║|                                  ||                                  ||                                 |║
║|             Search               ||              Currency            ||            Watched              |║
║|                                  ||                                  ||                                 |║
║└──────────────────────────────────┘└──────────────────────────────────┘└─────────────────────────────────┘║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════╝
                 /\                                    /\                                /\
                 ||                                    ||                                ||
                 \/                                    \/                                \/
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                    Server                                                 ║
║ ┌───────────────────────────────────────────────────────────────────────────────────────────────────────┐ ║
║ |                                                  Routes                                               | ║
║ └───────────────────────────────────────────────────────────────────────────────────────────────────────┘ ║
║                /\                                    /\                                /\                 ║
║                ||                                    ||                                ||                 ║
║                \/                                    \/                                \/                 ║
║┌──────────────────────────────────┐┌──────────────────────────────────┐┌─────────────────────────────────┐║
║|           onliner.js             ||            currency.js           ||             watch.js            |║
║|                                  ||                                  ||                                 |║
║| * Calls Onliner API;             || * Save user's preferences        || * Create watched;               |║
║| * Obtains & reduces data;        ||                                  || * Delete watched;               |║
║| * Returns data to Client.        ||                                  || * Get one;                      |║
║|                                  ||                                  || * Get all;                      |║
║└──────────────────────────────────┘└──────────────────────────────────┘└─────────────────────────────────┘║
║                +                                                                                          ║
║┌──────────────────────────────────┐                                                                       ║
║|           scoring.js             |                                                                       ║
║|                                  |                                                                       ║
║| * Performs search in ES index;   |                                                                       ║
║| * Provides custom scoring func;  |                                                                       ║
║| * Returns most relevant watched. |                                                                       ║
║|                                  |                                                                       ║
║└──────────────────────────────────┘                                                                       ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════╝
                /\                                     /\                                  /\
                ||                                     ||                                  ||
                \/                                     \/                                  \/
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                     Data                                                  ║
║┌──────────────────────────────────┐┌──────────────────────────────────┐┌─────────────────────────────────┐║
║|        Elasticsearch             ||               Redis              ||              Postgres           |║
║|                                  ||                                  ||                                 |║
║| * Search recommendations.        || * Currency preferences;          || * User information;             |║
║|                                  ||                                  ||                                 |║
║|                                  || * Price changes.                 || * Watched products information. |║
║|                                  ||                                  ||                                 |║
║└──────────────────────────────────┘└──────────────────────────────────┘└─────────────────────────────────┘║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════════════════════════╗
║                               Scheduler                               ║
║                                                                       ║
║ * mailer.js                        * description.js                   ║
║  Sends email-s using user's         Updates descriptions for needs    ║
║  currency preferences.              of Elasticsearch engine.          ║
║                                                                       ║
║ * price.js                                                            ║
║  Calls to Onliner API & updates                                       ║
║  data stored in ES & Redis                                            ║
║  if price has changed.                                                ║
╚═══════════════════════════════════════════════════════════════════════╝


```




## Author

* **George Puisha** - [GeorgePuisha](https://github.com/GeorgePuisha)

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

### Installing

Install all dependencies.

```
$ npm install
```

To run server on localhost type `npm start` in root folder.

```
$ npm start
```

To run server, you should provide it with database connection string. There are two ways to load credentials: change value of `connectionString` variable or load it from environmental variable.

```
$ DATABASE_URL='postgres://user:password@host:port/database' node app.js
```

Server works on port `3000`.

### Running the tests



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
* Easy start with Heroku ["Provision a database"](https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database) article.


## Built With

* [Node.js](https://github.com/nodejs/node) - JavaScript runtime for server;
* [npm](https://github.com/npm/npm) - Package manager for JavaScript;
* [Express.js](https://github.com/expressjs/express) - Framework for Node.js;
* [Heroku](https://www.heroku.com/home) - Deployment platform.
* [node-postgres](https://github.com/brianc/node-postgres) - PostgreSQL client for Node.js.

## Author

* **George Puisha** - [GeorgePuisha](https://github.com/GeorgePuisha)

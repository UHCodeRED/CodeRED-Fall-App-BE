# CodeRED-Back-End

This project is generated with [express generator](http://expressjs.com/starter/generator.html)

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.

## Install dependencies
Install npm dependencies 
```bash
$ npm install
```


## Build & Development Production

Run `node server.js` for building.

## Production
Variables that need to be set.
`process.env.MongoDB`, `process.env.cookieSessionSecret`
`NODE_PATH=./config:./app/controllers`
# CodeRED-Back-End

This project is generated with [express generator](http://expressjs.com/starter/generator.html)

###Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.

###Install dependencies
Install npm dependencies 
```bash
$ npm install
```

=======

###Development
Run this command in order to start server.
```bash
export MongoDB_DEV='DEV-DATABASE-URL' && export NODE_ENV=development && node server.js
```

#####OR 

go to `config/env/development.js` and simply set the `db` variable to desired database. And just run
```bash
export NODE_ENV=development && node server.js
```

=======

###Test
Run this command in order to run tests.
```bash
export MongoDB_TEST='TEST-DATABASE-URL' && export NODE_ENV=test && mocha 
```

#####OR 

go to `config/env/test.js` and simply set the `db` variable to desired database. And just run
```bash
export NODE_ENV=test && mocha
```

=======

###Production
Variables that need to be set on cloud provider. 
`MongoDB_PRO`, `cookieSessionSecret`
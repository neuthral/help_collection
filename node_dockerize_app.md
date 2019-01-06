[![node.js](https://nodejs.org/static/images/logo.svg)](https://nodejs.org/en/)

-   [HOME](https://nodejs.org/en/)

-   [ABOUT](https://nodejs.org/en/about/)

-   [DOWNLOADS](https://nodejs.org/en/download/)

-   [DOCS](https://nodejs.org/en/docs/)

-   [GET INVOLVED](https://nodejs.org/en/get-involved/)

-   [SECURITY](https://nodejs.org/en/security/)

-   [NEWS](https://nodejs.org/en/blog/)
-   [FOUNDATION](https://foundation.nodejs.org/)

-   [Docs](https://nodejs.org/en/docs/)
-   [ES6 and beyond](https://nodejs.org/en/docs/es6/)
-   [v10.13.0 API LTS](https://nodejs.org/dist/latest-v10.x/docs/api)
-   [v11.2.0 API](https://nodejs.org/dist/latest-v11.x/docs/api)
-   [Guides](https://nodejs.org/en/docs/guides/)
-   [Dependencies](https://nodejs.org/en/docs/meta/topics/dependencies/)

[Edit on GitHub](https://github.com/nodejs/nodejs.org/edit/master/locale/en/docs/guides/nodejs-docker-webapp.md)

Dockerizing a Node.js web app[](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/#dockerizing-a-node-js-web-app)
======================================================================================================================

The goal of this example is to show you how to get a Node.js application into a Docker container. The guide is intended for development, and *not* for a production deployment. The guide also assumes you have a working [Docker installation](https://docs.docker.com/engine/installation/) and a basic understanding of how a Node.js application is structured.

In the first part of this guide we will create a simple web application in Node.js, then we will build a Docker image for that application, and lastly we will run the image as a container.

Docker allows you to package an application with all of its dependencies into a standardized unit, called a container, for software development. A container is a stripped-to-basics version of a Linux operating system. An image is software you load into a container.

Create the Node.js app[](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/#create-the-node-js-app)
--------------------------------------------------------------------------------------------------------

First, create a new directory where all the files would live. In this directory create a `package.json` file that describes your app and its dependencies:

```
{
  "name": "docker_web_app",
  "version": "1.0.0",
  "description": "Node.js on Docker",
  "author": "First Last <first.last@example.com>",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.16.1"
  }
}

```

With your new `package.json` file, run `npm install`. If you are using `npm` version 5 or later, this will generate a `package-lock.json`file which will be copied to your Docker image.

Then, create a `server.js` file that defines a web app using the [Express.js](https://expressjs.com/) framework:

```
'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

```

In the next steps, we'll look at how you can run this app inside a Docker container using the official Docker image. First, you'll need to build a Docker image of your app.

Creating a Dockerfile[](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/#creating-a-dockerfile)
------------------------------------------------------------------------------------------------------

Create an empty file called `Dockerfile`:

```
touch Dockerfile

```

Open the `Dockerfile` in your favorite text editor

The first thing we need to do is define from what image we want to build from. Here we will use the latest LTS (long term support) version `8` of `node` available from the [Docker Hub](https://hub.docker.com/):

```
FROM node:8

```

Next we create a directory to hold the application code inside the image, this will be the working directory for your application:

```
# Create app directory
WORKDIR /usr/src/app

```

This image comes with Node.js and NPM already installed so the next thing we need to do is to install your app dependencies using the `npm` binary. Please note that if you are using `npm` version 4 or earlier a `package-lock.json` file will *not* be generated.

```
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

```

Note that, rather than copying the entire working directory, we are only copying the `package.json` file. This allows us to take advantage of cached Docker layers. bitJudo has a good explanation of this [here](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/).

To bundle your app's source code inside the Docker image, use the `COPY` instruction:

```
# Bundle app source
COPY . .

```

Your app binds to port `8080` so you'll use the `EXPOSE` instruction to have it mapped by the `docker` daemon:

```
EXPOSE 8080

```

Last but not least, define the command to run your app using `CMD` which defines your runtime. Here we will use the basic `npm start` which will run `node server.js` to start your server:

```
CMD [ "npm", "start" ]

```

Your `Dockerfile` should now look like this:

```
FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]

```

.dockerignore file[](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/#dockerignore-file)
-----------------------------------------------------------------------------------------------

Create a `.dockerignore` file in the same directory as your `Dockerfile` with following content:

```
node_modules
npm-debug.log

```

This will prevent your local modules and debug logs from being copied onto your Docker image and possibly overwriting modules installed within your image.

Building your image[](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/#building-your-image)
--------------------------------------------------------------------------------------------------

Go to the directory that has your `Dockerfile`and run the following command to build the Docker image. The `-t` flag lets you tag your image so it's easier to find later using the `docker images` command:

```
$ docker build -t <your username>/node-web-app .

```

Your image will now be listed by Docker:

```
$ docker images

# Example
REPOSITORY                      TAG        ID              CREATED
node                            8          1934b0b038d1    5 days ago
<your username>/node-web-app    latest     d64d3505b0d2    1 minute ago

```

Run the image[](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/#run-the-image)
--------------------------------------------------------------------------------------

Running your image with `-d` runs the container in detached mode, leaving the container running in the background. The `-p`flag redirects a public port to a private port inside the container. Run the image you previously built:

```
$ docker run -p 49160:8080 -d <your username>/node-web-app

```

Print the output of your app:

```
# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
Running on http://localhost:8080

```

If you need to go inside the container you can use the `exec` command:

```
# Enter the container
$ docker exec -it <container id> /bin/bash

```

Test[](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/#test)
--------------------------------------------------------------------

To test your app, get the port of your app that Docker mapped:

```
$ docker ps

# Example
ID            IMAGE                                COMMAND    ...   PORTS
ecce33b30ebf  <your username>/node-web-app:latest  npm start  ...   49160->8080

```

In the example above, Docker mapped the `8080` port inside of the container to the port `49160` on your machine.

Now you can call your app using `curl` (install if needed via: `sudo apt-get install curl`):

```
$ curl -i localhost:49160

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-M6tWOb/Y57lesdjQuHeB1P/qTV0"
Date: Mon, 13 Nov 2017 20:53:59 GMT
Connection: keep-alive

Hello world

```

We hope this tutorial helped you get up and running a simple Node.js application on Docker.

You can find more information about Docker and Node.js on Docker in the following places:

-   [Official Node.js Docker Image](https://hub.docker.com/_/node/)
-   [Node.js Docker Best Practices Guide](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
-   [Official Docker documentation](https://docs.docker.com/)
-   [Docker Tag on Stack Overflow](https://stackoverflow.com/questions/tagged/docker)
-   [Docker Subreddit](https://reddit.com/r/docker)

[↑ Scroll to top](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/#)

[![Linux Foundation Collaborative Projects](https://nodejs.org/static/images/lfcp.png)](http://collabprojects.linuxfoundation.org/)

-   [Report Node.js issue](https://github.com/nodejs/node/issues)

-   [Report website issue](https://github.com/nodejs/nodejs.org/issues)

-   [Get Help](https://github.com/nodejs/help/issues)

© Node.js Foundation. All Rights Reserved. Portions of this site originally © Joyent.

Node.js is a trademark of Joyent, Inc. and is used with its permission. Please review the [Trademark Guidelines of the Node.js Foundation](https://nodejs.org/static/documents/trademark-policy.pdf).

Linux Foundation is a registered trademark of The Linux Foundation.

Linux is a registered [trademark](http://www.linuxfoundation.org/programs/legal/trademark "Linux Mark Institute") of Linus Torvalds.

[Node.js Project Licensing Information](https://raw.githubusercontent.com/nodejs/node/master/LICENSE).

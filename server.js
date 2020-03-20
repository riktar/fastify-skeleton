/**
 * @description REST API using Sequelize and Fastify
 * @author Riccardo Tartaglia
 */
"use strict";

// ENV
require("dotenv").config();

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const AutoLoad = require("fastify-autoload");
const swagger = require("fastify-swagger");
const path = require("path");

//CORS
fastify.register(require("fastify-cors"), {});

// Swagger
fastify.register(swagger, require("./config/swagger"));

// Auto Load Service
fastify.register(AutoLoad, {
  dir: path.join(__dirname + "/app", "services")
});

// Auto Load API
fastify.register(AutoLoad, {
  dir: path.join(__dirname + "/app", "api")
});

// Auto Load Plugins
fastify.register(AutoLoad, {
  dir: path.join(__dirname + "/app", "plugins")
});

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "node_modules"),
  prefix: "/node_modules/" // optional: default '/'
});

// Run the server
const start = async () => {
  try {
    await fastify.ready();
    await fastify.swagger();
    let port = process.env.PORT || 3000;
    let host = process.env.HOST || "0.0.0.0";
    await fastify.listen(port, host);
    //fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err);
    //process.exit(1);
  }
};

process.on("uncaughtException", function(err) {
  // handle the error safely
  console.log(err);
});

process.on("Error", function(err) {
  // handle the error safely
  console.log(err);
});
// start
start();

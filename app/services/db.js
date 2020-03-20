"use strict";

const fp = require("fastify-plugin");
const mongoose = require("mongoose");
require("dotenv").config();

module.exports = fp(function(fastify, opts, next) {
  class DB {
    async connection() {
      if (mongoose.connection.readyState === 0)
        await mongoose.connect(process.env.MONGO, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
    }

    async model(modelName) {
      await this.connection();
      let modelSchema = require(`${__dirname}/../models/${modelName}.js`);
      return mongoose.model(modelName, modelSchema);
    }
  }

  fastify.decorate("db", new DB());
  next();
}, "2.x");

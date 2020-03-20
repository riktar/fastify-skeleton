/**
 * @description Simple CRUD REST
 * @author Riccardo Tartaglia
 */
"use strict";

module.exports = async (fastify, opts) => {
  fastify.register(require("./controller"));
  fastify.register(require("./routes"));
};

// optional
module.exports.autoPrefix = "api/v1";

// optional
// module.exports.autoload = false

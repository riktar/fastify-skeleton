/**
 * @description Auth utils
 * @author Riccardo Tartaglia
 */
"use strict";
const fp = require("fastify-plugin");
const boom = require("@hapi/boom");

module.exports = fp(async function(fastify, opts) {
  fastify.register(require("fastify-jwt"), {
    secret: process.env.APP_TOKEN_KEY
  });
  fastify.decorate("authenticate", async function(request, reply) {
    try {
      // decode of jwt, so you can use for example request.user in method
      await request.jwtVerify();
    } catch (err) {
      reply.code(401);
      reply.send(boom.boomify(err));
    }
  });

  fastify.decorate("checkRoleAdmin", async function(request, reply) {
    try {
      let user = request.user.info;
      // decode of jwt, so you can use for example request.user in method
      if (user.role > 0) {
        reply.code(403);
        reply.send(boom.forbidden("Not Authorized"));
      }
    } catch (err) {
      reply.code(401);
      reply.send(boom.boomify(err));
    }
  });
});

/**
 * @description Simple Controller
 * @author Riccardo Tartaglia
 */
"use strict";

const fp = require("fastify-plugin");
const Boom = require("@hapi/boom");

module.exports = fp(async function(fastify, opts) {
  class MessageController {
    static async actionPOSTMessage(request, reply) {
      let Message = await fastify.db.model("Message");
      let newMessage = new Message(request.body);
      await newMessage.save();
      reply.send(newMessage);
    }

    static async actionGETMessage(request, reply) {
      let Message = await fastify.db.model("Message");
      const id = request.params["id"];
      try {
        let response = id ? await Message.findById(id) : await Message.find({});
        reply.send(response);
      } catch (e) {
        reply.status(404);
        return Boom.notFound();
      }
    }

    static async actionDELETEMessage(request, reply) {
      let Message = await fastify.db.model("Message");
      const id = request.params["id"];
      let response = await Message.deleteOne({ _id: id });
      reply.send(response);
    }

    static async actionPUTMessage(request, reply) {
      let Message = await fastify.db.model("Message");
      const id = request.params["id"];
      const body = request.body;
      try {
        await Message.updateOne({ _id: id }, body);
        let response = await Message.findById(id);
        reply.send(response);
      } catch (e) {
        reply.status(400);
        return Boom.badRequest();
      }
    }
  }

  fastify.decorate("MessageController", MessageController);
}, "2.x");

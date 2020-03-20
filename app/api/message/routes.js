/**
 * @description Routes definitions for Fastify
 * @author Riccardo Tartaglia
 */
"use strict";

const bodyPOSTMessage = {
  type: "object",
  required: ["from", "to"],
  properties: {
    from: { type: "string", minLength: 1 },
    to: { type: "string", minLength: 1 },
    message: { type: 'string'}
  }
};

const paramsObj = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string" }
  }
};

module.exports = async (fastify, opts) => {
  const controller = fastify.MessageController;

  const routes = [
    {
      method: "GET",
      url: "/messages",
      preHandler: [],
      handler: controller.actionGETMessage,
      schema: {
        description: "",
        tags: ["Messages"],
        summary: "Get all the hello",
        security: [],
        response: {
          200: {
            type: 'array',
            items:{
              type: 'object',
              properties: {
                _id: {type: 'string'},
                to: { type: 'string' },
                from: { type: 'string' }
              }
            }

          }
        }
      }
    },
    {
      method: "GET",
      url: "/messages/:id",
      preHandler: [],
      handler: controller.actionGETMessage,
      schema: {
        description: "",
        params: paramsObj,
        tags: ["Messages"],
        summary: "Get message from id",
        security: []
      }
    },
    {
      method: "POST",
      url: "/messages",
      preHandler: [],
      handler: controller.actionPOSTMessage,
      schema: {
        description: "",
        tags: ["Messages"],
        summary: "Insert a message",
        security: [],
        body: bodyPOSTMessage
      }
    },
    {
      method: "PUT",
      url: "/messages/:id",
      preHandler: [],
      handler: controller.actionPUTMessage,
      schema: {
        description: "",
        tags: ["Messages"],
        params: paramsObj,
        summary: "Update a message",
        security: [],
        body: bodyPOSTMessage
      }
    },
    {
      method: "DELETE",
      url: "/messages/:id",
      preHandler: [],
      handler: controller.actionDELETEMessage,
      schema: {
        description: "",
        params: paramsObj,
        tags: ["Messages"],
        summary: "Delete a message",
        security: []
      }
    }
  ];

  routes.forEach((route, index) => {
    fastify.route(route);
  });
};

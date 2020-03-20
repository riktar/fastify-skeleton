/**
 * @description Swagger Conf
 * @author Riccardo Tartaglia
 */
"use strict";

module.exports = {
  routePrefix: "/api/doc",
  exposeRoute: true,
  swagger: {
    info: {
      title: process.env.APP_NAME,
      description: process.env.APP_DESCRIPTION,
      version: process.env.APP_VERSION
    },
    host:
      process.env.PORT !== "80"
        ? process.env.HOST + ":" + process.env.PORT
        : process.env.HOST,
    schemes: process.env.APP_PROTOCOL.split(","),
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      //{ name: 'User', description: 'User related end-points' }
    ],
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "Authorization",
        in: "header"
      }
    }
  }
};

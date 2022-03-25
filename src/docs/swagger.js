const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Ecommerce API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000/api/v1",
    },
    {
      url: "http://localhost:5001/api/v1",
    },
    {
      url: "http://localhost:3000/api/v1",
    },
    {
      url: "http://localhost:3001/api/v1",
    },
  ],
  components: {
    schemas: {
      users: {
        type: "object",
        required: ["name", "lastname", "email", "password", "role"],
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          lastname: {
            type: "string",
          },
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
          role: {
            type: "string",
          },
        },
      },
      users_edit: {
        type: "object",
        required: ["name", "lastname", "email"],
        properties: {
          name: {
            type: "string",
          },
          lastname: {
            type: "string",
          },
          email: {
            type: "string",
          },
          role: {
            type: "string",
          }
        },
      },
      categories: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          }
        },
      },
      products: {
        type: "object",
        required: ["product_name","category_id"],
        properties: {
          product_name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          stock: {
            type: "float",
          },
          price: {
            type: "float",
          },
          imagen: {
            type: "string",
          },
          favorite: {
            type: "boolean",
          },
          category_id: {
            type: "integer",
          }
        },
      },
    },
    securitySchemes:{
      bearerAuth:{
        type:'http',
        scheme:'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
};

const options = {
  swaggerDefinition,
  apis: [ `${path.resolve('src','routes')}/*.js`]
};

const openapiSpecification = swaggerJsDoc(options);

module.exports = openapiSpecification;

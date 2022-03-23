const swaggerJsDoc = require("swagger-jsdoc");

const definition = {
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
    schemas:{
        users:{
            type: "object",
            properties: {
                required:['name','lastname','email','password','role'],
                id: {type:'integer'},
                name: {type:'string'},
                lastname: {type:'string'},
                email: {type:'string'},
                password: {type:'string'},
                role: {type:'string'},
                deleted: {type:'boolean'},
            }
        }
    }
  }
};

const options = {
  definition,
  apis: ["../routes/*.js"], // files containing annotations as above
};

const openapiSpecification = swaggerJsDoc(options);

module.exports = openapiSpecification;

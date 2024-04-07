const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather Data API',
      version: '1.0.0',
      description: 'API documentation for weather data endpoints',
    },
    servers: [
      {
        url: 'http://localhost:4000', // Update with your server URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Update with your route files directory
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

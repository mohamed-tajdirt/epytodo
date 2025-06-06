const express = require('express');
require('dotenv').config();
const notFound = require('./middleware/notFound');
const auth = require('./routes/auth/auth.js');
const user = require('./routes/user/user.js');
const todos = require('./routes/todos/todos.js');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        return res.status(400).json({ msg: 'Invalid JSON' });
    }
    if (err) return res.status(500).json({ msg: 'Internal server error' });
    next();
});


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "EPYTODO API",
            version: "1.0.0",
            description: "API documentation for EPYTODO Todo app project",
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'Something went wrong',
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/**/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', auth);
app.use('/', user);
app.use('/', todos);

app.use(notFound);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});

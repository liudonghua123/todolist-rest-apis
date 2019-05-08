import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import './error';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.server = http.createServer(app);

// options for the swagger docs
const options = {
  // Swagger definition
  swaggerDefinition: {
    info: {
      title: 'REST API for Todo', // Title of the documentation
      version: '1.0.0', // Version of the app
      description: 'This is the REST API for todo' // short description of the app
    },
    basePath: '/api' // the basepath of your endpoint
  },
  // path to the API docs
  apis: ['./src/api/**/*.js']
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// use swagger-Ui-express for your app documentation endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use('/docs', express.static(__dirname + '/../docs'));

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(
  cors({
    exposedHeaders: config.corsHeaders
  })
);

app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);

// connect to db
initializeDb(db => {
  // send a greet
  app.get('/', (req, res) => res.send('welcome!'));

  // internal middleware
  app.use(middleware({ config, db }));

  // api router
  app.use('/api', api({ config, db }));

  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
});

export default app;

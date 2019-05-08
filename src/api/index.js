import { version } from '../../package.json';
import { Router } from 'express';
import users from './users';
import todos from './todos';

/**
 * @swagger
 * securityDefinitions:
 *   ApiKeyAuth:        # arbitrary name for the security scheme
 *     type: apiKey
 *     in: header       # can be "header", "query" or "cookie"
 *     name: Authorization  # name of the header, query parameter or cookie
 *
 */
export default ({ config, db }) => {
  let api = Router();

  api.use('/users', users({ config, db }));

  // mount the todos resource
  api.use('/todos', todos({ config, db }));

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
};

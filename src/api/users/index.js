import { Router } from 'express';
import users from './users';

export default ({ config, db }) => {
  let api = Router();

  /**
   * @api {post} /users/login Login
   * @apiGroup User
   *
   * @apiParam {String} email User's email
   * @apiParam {String} password User's password
   *
   * @apiSuccess {Boolean} error false
   * @apiSuccess {String} token Authorization Token
   */

  /**
   * @swagger
   *
   * definitions:
   *   User:
   *     type: object
   *     properties:
   *       name:
   *         type: string
   *         example: 'test'
   *       email:
   *         type: string
   *         example: 'test@test.com'
   *       password:
   *         type: string
   *         example: 'test'
   *   TokenResponse:
   *     type: object
   *     properties:
   *       code:
   *         type: integer
   *         example: 0
   *       token:
   *         type: string
   */
  /**
   * @swagger
   * /users/login:
   *    post:
   *      tags:
   *      - User
   *      description: login a user
   *      summary: login user
   *      produces:
   *      - application/json
   *      parameters:
   *        - name: user
   *          description: user object
   *          in:  body
   *          required: true
   *          schema:
   *            $ref: '#/definitions/User'
   *      responses:
   *        200:
   *          description: return the token object
   *          schema:
   *            $ref: '#/definitions/TokenResponse'
   *
   */
  api.post('/login', (req, res) => users({ req, res, config, db }).login());

  /**
   * @api {post} /users/register Register
   * @apiGroup User
   *
   * @apiParam {String} name User's name
   * @apiParam {String} email Email to be registered
   * @apiParam {String} password Password of new account
   *
   * @apiSuccess {Boolean} error false
   * @apiSuccess {String} token Authorization Token
   */

  /**
   * @swagger
   * /users/register:
   *    post:
   *      tags:
   *      - User
   *      description: register a user
   *      summary: register user
   *      produces:
   *      - application/json
   *      parameters:
   *        - name: user
   *          description: user object
   *          in:  body
   *          required: true
   *          schema:
   *            $ref: '#/definitions/User'
   *      responses:
   *        200:
   *          description: return the token object
   *          schema:
   *            $ref: '#/definitions/TokenResponse'
   *
   */
  api.post('/register', (req, res) =>
    users({ req, res, config, db }).register()
  );

  return api;
};

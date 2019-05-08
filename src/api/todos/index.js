import { Router } from 'express';
import todos from './todos';

/**
 * @apiDefine AuthHeader
 * @apiHeader (Headers) {String} authorization Authorization token in format: 'Bearer {token}'
 */

export default ({ config, db }) => {
  let api = Router();

  /**
   * @api {get} /todos Fetch all todos
   * @apiGroup todos
   *
   * @apiUse AuthHeader
   *
   * @apiSuccess {Boolean} error false
   * @apiSuccess {Array} todos Array of todos
   */
  /**
   * @swagger
   * definitions:
   *   Todo:
   *     type: object
   *     properties:
   *       text:
   *         type: string
   *         example: 'todo-item'
   *       isCompleted:
   *         type: boolean
   *         example: false
   *   TodoResponse:
   *     type: object
   *     properties:
   *       code:
   *         type: integer
   *         example: 0
   *       data:
   *         type: object
   *         $ref: '#/definitions/Todo'
   *   TodosResponse:
   *     type: object
   *     properties:
   *       code:
   *         type: integer
   *         example: 0
   *       data:
   *         type: array
   *         items:
   *          $ref: '#/definitions/Todo'
   */
  /**
   * @swagger
   * /todos:
   *    get:
   *      tags:
   *      - Todo
   *      security:
   *        - ApiKeyAuth: []
   *      description: get all todos
   *      summary: get todos
   *      produces:
   *      - application/json
   *      responses:
   *        200:
   *          description: return the created todo
   *          schema:
   *            $ref: '#/definitions/TodosResponse'
   */
  api.get('/', (req, res) => todos({ req, res, config, db }).fetchAll());

  /**
   * @api {post} /todos Create a new list
   * @apiGroup todos
   *
   * @apiUse AuthHeader
   *
   * @apiParam {Object[]} items Array of item
   * @apiParam {String} -.text Text of task
   * @apiParam {Boolean} -.isCompleted Represents if task is completed (default: false)
   *
   * @apiSuccess {Boolean} error false
   * @apiSuccess {Object} savedList Newly created list
   */

  /**
   * @swagger
   * /todos:
   *    post:
   *      tags:
   *      - Todo
   *      security:
   *        - ApiKeyAuth: []
   *      description: create a todo
   *      summary: create todo
   *      produces:
   *      - application/json
   *      parameters:
   *        - name: todo
   *          description: todo object
   *          in:  body
   *          required: true
   *          schema:
   *            $ref: '#/definitions/Todo'
   *      responses:
   *        200:
   *          description: return the created todo
   *          schema:
   *            $ref: '#/definitions/TodoResponse'
   *
   */
  api.post('/', (req, res) => todos({ req, res, config, db }).create());

  /**
   * @api {put} /todos/:id Update a list
   * @apiGroup todos
   *
   * @apiUse AuthHeader
   *
   * @apiParam {Object[]} items Array of item
   * @apiParam {String} -.text Text of task
   * @apiParam {Boolean} -.isCompleted Represents if task is completed
   *
   * @apiSuccess {Boolean} error false
   */

  /**
   * @swagger
   * /todos/{id}:
   *    put:
   *      tags:
   *      - Todo
   *      security:
   *        - ApiKeyAuth: []
   *      description: update a todo
   *      summary: update todo
   *      produces:
   *      - application/json
   *      parameters:
   *        - name: id
   *          description: id of the todo
   *          in:  path
   *          required: true
   *          type: string
   *        - name: todo
   *          description: todo object
   *          in:  body
   *          required: true
   *          schema:
   *            $ref: '#/definitions/Todo'
   *      responses:
   *        200:
   *          description: return the created todo
   *          schema:
   *            $ref: '#/definitions/TodoResponse'
   *
   */
  api.put('/:id', (req, res) => todos({ req, res, config, db }).update());

  /**
   * @api {delete} /todos/:id Delete a list
   * @apiGroup todos
   *
   * @apiUse AuthHeader
   *
   * @apiSuccess {Boolean} error false
   */

  /**
   * @swagger
   * /todos/{id}:
   *    delete:
   *      tags:
   *      - Todo
   *      security:
   *        - ApiKeyAuth: []
   *      description: delete a todo
   *      summary: delete todo
   *      produces:
   *      - application/json
   *      parameters:
   *        - name: id
   *          description: id of the todo
   *          in:  path
   *          required: true
   *          type: integer
   *      responses:
   *        200:
   *          description: return the deleted todo
   *          schema:
   *            $ref: '#/definitions/TodoResponse'
   *
   */
  api.delete('/:id', (req, res) => todos({ req, res, config, db }).delete());

  /**
   * @api {delete} /todos/ Delete a list
   * @apiGroup todos
   *
   * @apiUse AuthHeader
   *
   * @apiSuccess {Boolean} error false
   */

  /**
   * @swagger
   * /todos:
   *    delete:
   *      tags:
   *      - Todo
   *      security:
   *        - ApiKeyAuth: []
   *      description: delete todos
   *      summary: delete todos
   *      produces:
   *      - application/json
   *      parameters:
   *        - name: _ids
   *          description: the id array of the remove todo
   *          in:  body
   *          required: true
   *          schema:
   *            properties:
   *              _ids:
   *                type: array
   *                items:
   *                  type: string
   *      responses:
   *        200:
   *          description: return the deleted todo
   *          schema:
   *            $ref: '#/definitions/TodosResponse'
   *
   */
  api.delete('/', (req, res) => todos({ req, res, config, db }).batchDelete());

  return api;
};

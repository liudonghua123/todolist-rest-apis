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

  api.put('/:id', (req, res) => todos({ req, res, config, db }).update());

  /**
   * @api {delete} /todos/:id Delete a list
   * @apiGroup todos
   *
   * @apiUse AuthHeader
   *
   * @apiSuccess {Boolean} error false
   */

  api.delete('/:id', (req, res) => todos({ req, res, config, db }).delete());

  return api;
};

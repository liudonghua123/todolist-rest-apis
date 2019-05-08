import TodoModel from '../../models/todos';
import { toRes, mongooseErrorHandler } from './../../lib/util';

export default ({ req, res, config, db }) => ({
  fetchAll() {
    TodoModel(db).find({ userId: req.user._id }, (err, result) => {
      if (err) return toRes(res, 500)(mongooseErrorHandler(err));
      toRes(res)(null, { data: result });
    });
  },

  create() {
    TodoModel(db).create(
      {
        userId: req.user._id,
        ...req.body
      },
      (err, result) => {
        if (err) return toRes(res, 500)(mongooseErrorHandler(err));
        toRes(res)(null, { data: result });
      }
    );
  },

  update() {
    TodoModel(db).findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      // https://stackoverflow.com/questions/30419575/mongoose-findbyidandupdate-not-returning-correct-model
      { new: true },
      (err, result) => {
        if (err) return toRes(res, 500)(mongooseErrorHandler(err));
        toRes(res)(null, { data: result });
      }
    );
  },

  delete() {
    TodoModel(db).find({ _id: req.params.id }, (err, result) => {
      if (err) return toRes(res, 500)(mongooseErrorHandler(err));
      if (result.length === 0) {
        return toRes(res, 404)({ message: 'item not found' });
      }
      if (result[0].userId != req.user._id) {
        return toRes(res, 401)({
          message: "You cannot manipulate other's list"
        });
      }

      result[0].remove((err, result) => {
        if (err) return toRes(res, 404)(mongooseErrorHandler(err));
        toRes(res)(null, { data: result });
      });
    });
  },

  batchDelete() {
    // TodoModel(db).remove({ _id: { $in: req.body._ids } }, (err, result) => {
    //   if (err) toRes(res, 500)(mongooseErrorHandler(err));
    //   toRes(res)(null, { data: result });
    // });
    TodoModel(db).find({ _id: { $in: req.body._ids } }, (err, result) => {
      if (err) return toRes(res, 500)(mongooseErrorHandler(err));
      if (result.length === 0) {
        return toRes(res, 404)({ message: 'item not found' });
      }
      // check userId
      const filtedResult = result.filter(item => item.userId != req.user._id);
      if (filtedResult.length !== 0) {
        return toRes(res, 401)({
          message: "You cannot manipulate other's list"
        });
      }
      // remove the items
      TodoModel(db).remove({ _id: { $in: req.body._ids } }, err => {
        if (err) toRes(res, 500)(mongooseErrorHandler(err));
        toRes(res)(null, { data: result });
      });
    });
  }
});

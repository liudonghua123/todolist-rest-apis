import ListModel from '../../models/lists';
import { toRes, mongooseErrorHandler } from './../../lib/util';

export default ({ req, res, config, db }) => ({
  fetchAll() {
    ListModel(db).find({ userId: req.user._id }, (err, result) => {
      if (err) return toRes(res, 500)(mongooseErrorHandler(err));
      toRes(res)(null, { data: result });
    });
  },

  create() {
    ListModel(db).create(
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
    ListModel(db).findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      (err, result) => {
        if (err) return toRes(res, 500)(mongooseErrorHandler(err));
        toRes(res)(null, { data: result });
      }
    );
  },

  delete() {
    ListModel(db).find({ _id: req.params.id }, (err, result) => {
      if (err) return toRes(res, 404)(mongooseErrorHandler(err));
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
  }
});

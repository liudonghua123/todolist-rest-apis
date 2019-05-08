import { Schema, SchemaTypes } from 'mongoose';

const Todo = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    required: true
  },
  text: { type: String, required: true },
  isCompleted: { type: Boolean, default: false }
});

// https://stackoverflow.com/questions/11160955/how-to-exclude-some-fields-from-the-document
Todo.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.userId;
    delete ret.__v;
    return ret;
  }
});

const TodoModel = db => db.model('todo', Todo);

export default TodoModel;

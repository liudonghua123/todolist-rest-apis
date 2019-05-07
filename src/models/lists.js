import { Schema, SchemaTypes } from 'mongoose';

const List = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    required: true
  },
  text: { type: String, required: true },
  isCompleted: { type: Boolean, default: false }
});

// https://stackoverflow.com/questions/11160955/how-to-exclude-some-fields-from-the-document
List.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.userId;
    delete ret.__v;
    return ret;
  }
});

const ListModel = db => db.model('list', List);

export default ListModel;

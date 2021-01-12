import { model, Schema, Document } from "mongoose";

export interface ITagModel extends Document {
  name: string;
  title: string;
  photos: any;
}

const tagSchema = new Schema({
  name: {
    type: String,
    required: [true, "A tag must have a name"],
    unique: true,
    trim: true,
    maxlength: [50, "A name must have less than 255 characters"],
    minlength: [3, "A name must have more than 5 characters"],
    //validate: [validator.isAlpha, "Tour name must only contain characters"]
  },
  title: {
    type: String,
  },
});

const TagModel = model<ITagModel>("Tag", tagSchema);

export default TagModel;

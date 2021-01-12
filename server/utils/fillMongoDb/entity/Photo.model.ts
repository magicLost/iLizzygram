import { model, Schema, Document } from "mongoose";

export interface IPhoto {
  date: Date;
  base64: string;
  files: string[];
  aspectRatio: number; //1.6
  srcSet: string;
  iconSrc: string;
  src: string;
  _timestamp: number;
  description: string;
  tags: any;
}

export interface IPhotoModel extends IPhoto, Document {}

//TODO add srcSet, src, base64, sizes and maybe sizesIcon(size for wallOfPhoto icon)
const photoSchema = new Schema({
  _timestamp: {
    type: Number,
  },
  base64: String,
  date: Date,
  files: [String],
  aspectRatio: Number, //1.6
  iconSrc: String,
  src: String,
  srcSet: String,
  description: {
    type: String,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

photoSchema.pre(/^find/, function (next) {
  (this as any).populate({
    path: "tags",
    select: "-__v",
  });
  next();
});

const PhotoModel = model<IPhotoModel>("Photo", photoSchema);

export default PhotoModel;

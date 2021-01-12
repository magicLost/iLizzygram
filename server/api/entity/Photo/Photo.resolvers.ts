import { ApolloError } from "apollo-server-express";
import PhotoModel from "./Photo.model";

import { IEditPhotoInput } from "./Photo.utils";
/* import fs from "fs";
import { path as rootPath } from "app-root-path";
import { resolve as pathResolve } from "path";
import {
  makeJpgsByWidths,
  getBase64AndAspectRatio,
} from "../../../utils/sharp";
 */
import { PhotoHelperCloudinary } from "./Photo.helper";
import {
  pathToUploadPhotoFileDir,
  pathToWebResultPhotoDir,
  pathToFsResultPhotoDir,
} from "./config";
import escape from "validator/lib/escape";

//import { uploadImagesByDifferentWidths } from "../../../utils/cloudinary";
interface IPhotosInput {
  limit: number;
  isSortDesc: boolean;
  tagsIds?: string[];
  cursor?: number;
}

export const resolvers = {
  Query: {
    photoById: async (_: any, { _id }: { _id: string[] }, ctx: any) => {
      try {
        //console.log("TAGS ", JSON.stringify(tagsIds));
        const photo = await PhotoModel.findById(_id);
        //console.log("PHOTOS ", JSON.stringify(photos));
        return photo;
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    },
    photos: async (
      _: any,
      { limit = 10, isSortDesc, tagsIds, cursor }: IPhotosInput,
      ctx: any
    ) => {
      try {
        let query;

        const desc = isSortDesc ? -1 : 1;

        const criteria: any = {};

        if (cursor) {
          criteria._timestamp = isSortDesc ? { $lt: cursor } : { $gt: cursor };
        }

        if (tagsIds && tagsIds.length > 0) {
          criteria.tags = {
            $all: tagsIds,
          };
        }

        query = PhotoModel.find(criteria)
          .sort({ _timestamp: desc })
          .limit(limit + 1);

        /*  if (cursor) {
          query = PhotoModel.find({ _timestamp: { $lt: cursor } })
            .sort({ _timestamp: desc })
            .limit(limit + 1);
        } else {
          query = PhotoModel.find()
            .sort({ _timestamp: desc })
            .limit(limit + 1);
        } */
        const photos = await query;

        //console.log("PHOTOS ", photos.length, ctx.res.headersSent);

        const hasNextPage = photos.length > limit;

        if (hasNextPage) photos.pop();

        //console.log("TOURS", tours);

        return {
          edges: photos,
          pageInfo: {
            endCursor: photos[photos.length - 1]._timestamp,
            hasNextPage,
          },
        };
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    },
    photoByTagsIds: async (
      _: any,
      { tagsIds }: { tagsIds: string[] },
      ctx: any
    ) => {
      try {
        //console.log("TAGS ", JSON.stringify(tagsIds));
        const photos = await PhotoModel.find({
          tags: {
            $all: tagsIds,
          },
        });
        //console.log("PHOTOS ", JSON.stringify(photos));
        return photos;
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    },
  },
  Mutation: {
    //id: ID!, file: Upload, desc: String, date: String, tags: [ID!]
    photoUpload: async (_: any, { file, desc, date, tags }: any, ctx: any) => {
      //VALIDATE
      const filterDesc = validate(date, desc, tags);

      const helper = new PhotoHelperCloudinary(
        pathToUploadPhotoFileDir,
        pathToFsResultPhotoDir,
        //pathToWebResultPhotoDir,
        date,
        filterDesc,
        tags
      );

      const photo = await helper.upload(file);

      return photo;
    },

    photoEdit: async (_: any, photoInput: IEditPhotoInput, ctx: any) => {
      //VALIDATE
      const filterDesc = validate(
        photoInput.date,
        photoInput.desc,
        photoInput.tags
      );

      const helper = new PhotoHelperCloudinary(
        pathToUploadPhotoFileDir,
        pathToFsResultPhotoDir,
        //pathToWebResultPhotoDir,
        photoInput.date,
        filterDesc,
        photoInput.tags
      );

      const photo = await helper.edit(photoInput.id, photoInput.file);

      return photo;
    },
  },
};

export const validate = (date?: Date, desc?: string, tags?: string[]) => {
  //desc - remove tags
  const filterDesc = desc ? escape(desc) : "";
  //tags - array of strings
  if (tags && !tagsValidate(tags)) {
    console.log(`VALIDATION TAGS FAILED `, tags);
    throw new ApolloError("Некорректные тэги.");
  }
  //date - Date, at interval from birthday to present day
  if (date && !dateValidate(date)) {
    console.log(`VALIDATION DATE FAILED `, date);
    throw new ApolloError("Некорректная дата.");
  }

  return filterDesc;
};

const regex = (value: string, pattern: RegExp) => {
  const match = value.match(pattern);

  if (match === null) {
    return false;
  } else if (match[0] !== value) {
    return false;
  }

  return true;
};

export const tagsValidate = (tags: string[]) => {
  const pattern = /[0-9a-zA-Z]*/;

  if (!Array.isArray(tags)) return false;

  if (tags.length === 0) return false;

  for (let tag of tags) {
    if (typeof tag !== "string") return false;

    if (!regex(tag, pattern)) return false;
  }

  return true;
};

export const dateValidate = (date: Date) => {
  const d = new Date(date);

  //year, month, day
  const birthday = new Date(2018, 6, 8);
  const today = new Date();

  if (d >= birthday && d <= today) return true;

  return false;
};

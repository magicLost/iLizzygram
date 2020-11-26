export type TTagsFormState = { [id: string]: boolean };

export interface IUserResponseToClient {
  name: string;
  email: string;
  uid: string;
}

export interface IAuthUser extends IUserResponseToClient {
  isEditor: boolean;
}

/* export type IFirestoreData = Map<string, any>; */

export interface IUser extends IUserResponseToClient {
  email: string;
  password: string;
  passwordConfirm: string;

  passwordChangedAt?: string;
  passwordResetToken?: string;
  passwordResetExpires?: string;
  active?: boolean;
}

export interface IPhoto {
  //_id: any;
  base64: string;
  files: string[];
  aspectRatio: number; //1.6
  srcSet: string;
  iconSrc: string;
  src: string;

  _timestamp: Date;
  description: string;
  date: Date;
  yearsOld: number;
  tags: {
    [id: string]: boolean;
  };

  googleDriveId: string;
  addedByUserUID: string;
  // do we make changes by express
  isActive: boolean;
}

export interface IPhotoData {
  id: string;
  photo: IPhoto;
}

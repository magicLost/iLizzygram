export interface IUserResponseToClient {
  name: string;
  role: string;
}

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
  _id: any;
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
  googleDriveId: string;
  //addedByUser
}

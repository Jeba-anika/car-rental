import { Model } from "mongoose";

export interface TUser {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  phone: string;
  address: string;
}

export type TUserSignIn = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): boolean;
}

import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser, TUserSignIn } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const userSignIn = async (payload: TUserSignIn) => {
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist!");
  }
  console.log(user);
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is not correct!");
  }

  return user;
};

export const UserService = { createUser, userSignIn };

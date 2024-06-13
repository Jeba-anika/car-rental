import { TUser, TUserSignIn } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const userSignIn = async (payload: TUserSignIn) => {
  const user = await User.isUserExists(payload.email);
  console.log(user);
  return {};
};

export const UserService = { createUser, userSignIn };

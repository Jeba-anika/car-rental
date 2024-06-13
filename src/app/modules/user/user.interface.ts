import { Model, Types } from 'mongoose'

export interface TUser {
  _id: Types.ObjectId
  name: string
  email: string
  role: 'user' | 'admin'
  password: string
  phone: string
  address: string
}

export type TUserSignIn = {
  email: string
  password: string
}

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): TUser
}

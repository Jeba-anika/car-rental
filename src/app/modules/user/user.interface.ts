import { Document, Model, Types } from 'mongoose'
import { USER_ROLE } from './user.constants'

export interface TUser extends Document {
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
  isUserExists(email: string): Promise<TUser | null>
}
export type TUserRole = keyof typeof USER_ROLE

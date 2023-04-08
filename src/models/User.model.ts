import mongoose from 'mongoose'

import type { IUser } from '../types/user.types'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'email must be fill'],
      unique: [true, 'email must be unique']
    },
    password: {
      type: String,
      require: [true, 'password must be fill']
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y'
    },
    username: {
      type: String,
      require: [true, 'username must be fill']
    },
    name: {
      type: String,
      require: [true, 'name must be fill']
    },
    phoneNumber: {
      type: String,
      require: [true, 'phone number must be fill']
    },
    avatar: { type: String },
    favorite: { type: String }
  },
  { timestamps: true }
)

const UserModel = mongoose.model<IUser>('user', userSchema)

export default UserModel

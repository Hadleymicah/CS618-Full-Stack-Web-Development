/* ORIGINAL FROM LECTURES BEFORE MILESTONE 1

import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    contents: String,
    tags: [String],
  },
  { timestamps: true },
)
export const Post = mongoose.model('post', postSchema)
*/

import mongoose, { Schema } from 'mongoose'

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    contents: String,
    //NEW FOR MILESTONE 1
    ingredients: String,
    //NEW FOR MILESTONE 1
    imageUrl: String,
    tags: [String],
  },
  { timestamps: true },
)
export const Post = mongoose.model('post', postSchema)

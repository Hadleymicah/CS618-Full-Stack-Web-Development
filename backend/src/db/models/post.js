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
    imageUrl: String,
    //END NEW FOR MILESTONE 1
    tags: [String],
    //NEW FOR MILESTONE 2
    likeCount: { type: Number, default: 0 },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    //END NEW FOR MILESTONE 2
  },
  { timestamps: true },
)
export const Post = mongoose.model('post', postSchema)

import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'

/* CREATE POST FUNCTION FROM BEFORE MILESTONE 1
export async function createPost(userID, { title, contents, tags }) {
  const post = new Post({ title, author: userID, contents, tags })
  return await post.save()
}
*/
// MODIFIED CREATE POST FUNCTION FOR MILESTONE 1 - ADDED INGREDIENTS AND IMAGEURL
export async function createPost(
  userID,
  { title, contents, tags, ingredients, imageUrl },
) {
  const post = new Post({
    title,
    author: userID,
    contents,
    tags,
    ingredients,
    imageUrl,
  })
  return await post.save()
}
// END OF MOD FOR MILESTONE 1

async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Post.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllPosts(options) {
  return await listPosts({}, options)
}

export async function listPostsByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listPosts({ author: user._id }, options)
}

export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}

export async function getPostById(postId) {
  return await Post.findById(postId)
}

export async function updatePost(userId, postId, { title, contents, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId, author: userId },
    { $set: { title, contents, tags } },
    { new: true },
  )
}

export async function deletePost(userId, postId) {
  return await Post.deleteOne({ _id: postId, author: userId })
}

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

// NEW FOR MILESTONE 2 - LIKE A POST FUNCTION
export async function likePost(userId, postId) {
  const post = await Post.findById(postId)
  if (!post) return null

  // Check if the user has already liked the post
  const alreadyLiked = post.likedBy.some(
    (id) => id.toString() === userId.toString(),
  )
  if (alreadyLiked) {
    //No needed change, just return the post
    return post
  }

  //Add user to likedBy and increment likeCount
  post.likedBy.push(userId)
  post.likeCount = (post.likeCount || 0) + 1

  await post.save()
  return post
}

export async function unlikePost(userId, postId) {
  const post = await Post.findById(postId)
  if (!post) return null

  const before = post.likedBy.length

  //Remove user from likedBy
  post.likedBy = post.likedBy.filter(
    (id) => id.toString() !== userId.toString(),
  )

  //if nothing changed, just return it
  if (post.likedBy.length === before) {
    return post
  }

  //decrement likeCount but dont go below 0
  post.likeCount = Math.max(0, (post.likeCount || 0) - 1)

  await post.save()
  return post
}

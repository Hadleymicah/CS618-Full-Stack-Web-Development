import { getUserInfoById } from '../services/users.js'

export const postSchema = `#graphql
type Post {
    id: ID!
    title: String!
    author: User
    contents: String
    imageUrl: String
    ingredients: String
    tags: [String!]
    likeCount: Int #MODIFICATION FOR MILESTONE 2
    likedBy: [ID!] #MODIFICATION FOR MILESTONE 2
    createdAt: Float
    updatedAt: Float
    }
`
export const postResolver = {
  Post: {
    author: async (post) => {
      return await getUserInfoById(post.author)
    },
  },
}

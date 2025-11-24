import {
  getPostById,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
} from '../services/posts.js'
//CHANGED FOR MILESTONE 2
import {
  getTotalViews,
  getDailyViews,
  getDailyDurations,
  getTopPosts,
} from '../services/events.js'
//END CHANGED FOR MILESTONE 2

export const querySchema = `#graphql
    input PostsOptions {
        sortBy: String
        sortOrder: String
        }
        type Query {
            test: String
            posts(options: PostsOptions): [Post!]!
            postsByAuthor(username: String!, options: PostsOptions):[Post!]!
            postsByTag(tag: String!, options: PostsOptions): [Post!]!
            postById(id: ID!, options: PostsOptions): Post
            totalViews(postId: ID!): ViewStats #CHANGED FOR MILESTONE 2
            dailyViews(postId: ID!): [DailyViews!]! #CHANGED FOR MILESTONE 2
            dailyDurations(postId: ID!): [DailyDurations!]! #CHANGED FOR MILESTONE 2
            topPosts(limit: Int): [Post!]! #CHANGED FOR MILESTONE 2
    }
    `
export const queryResolver = {
  Query: {
    test: () => {
      return 'Hello World from GraphQL!'
    },
    posts: async (parent, { options }) => {
      return await listAllPosts(options)
    },
    postsByAuthor: async (parent, { username, options }) => {
      return await listPostsByAuthor(username, options)
    },
    postsByTag: async (parent, { tag, options }) => {
      return await listPostsByTag(tag, options)
    },
    postById: async (parent, { id }) => {
      return await getPostById(id)
    },
    //CHANGED FOR MILESTONE 2
    totalViews: async (parent, { postId }) => {
      return await getTotalViews(postId)
    },
    dailyViews: async (parent, { postId }) => {
      return await getDailyViews(postId)
    },
    dailyDurations: async (parent, { postId }) => {
      return await getDailyDurations(postId)
    },
    topPosts: async (parent, { limit = 3 }) => {
      return await getTopPosts(limit)
    },
    //END CHANGED FOR MILESTONE 2
  },
}

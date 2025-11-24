import { GraphQLError } from 'graphql'
import { createUser, loginUser } from '../services/users.js'
//MODIFICATION FOR MILESTONE 2
import { createPost, likePost, unlikePost } from '../services/posts.js'
//END MODIFICATION FOR MILESTONE 2

export const mutationSchema = `#graphql
type Mutation {
    signupUser(username: String!, password: String!): User
    loginUser(username: String!, password: String!): String
    createPost(title: String!, imageUrl: String, ingredients: String, contents: String, tags:[String]): Post
    likePost(postId: ID!): Post #MODIFICATION FOR MILESTONE 2
    unlikePost(postId: ID!): Post #MODIFICATION FOR MILESTONE 2
    }
    `
export const mutationResolver = {
  Mutation: {
    signupUser: async (parent, { username, password }) => {
      return await createUser({ username, password })
    },
    loginUser: async (parent, { username, password }) => {
      return await loginUser({ username, password })
    },
    createPost: async (
      parent,
      { title, imageUrl, ingredients, contents, tags },
      { auth },
    ) => {
      if (!auth) {
        throw new GraphQLError(
          'You need to be authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHORIZED',
            },
          },
        )
      }
      return await createPost(auth.sub, {
        title,
        imageUrl,
        ingredients,
        contents,
        tags,
      })
    },

    //MODIFICATION FOR MILESTONE 2
    likePost: async (parent, { postId }, { auth }) => {
      if (!auth) {
        throw new GraphQLError(
          'You need to be authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHORIZED',
            },
          },
        )
      }
      return await likePost(auth.sub, postId)
    },
    unlikePost: async (parent, { postId }, { auth }) => {
      if (!auth) {
        throw new GraphQLError(
          'You need to be authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHORIZED',
            },
          },
        )
      }
      return await unlikePost(auth.sub, postId)
    },
    //END MODIFICATION FOR MILESTONE 2
  },
}

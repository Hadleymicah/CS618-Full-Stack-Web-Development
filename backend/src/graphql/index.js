import { querySchema, queryResolver } from './query.js'
import { postSchema, postResolver } from './post.js'
import { userSchema, userResolver } from './user.js'
import { mutationSchema, mutationResolver } from './mutation.js'
import { eventSchema, eventResolver } from './event.js' //CHANGED FOR MILESTONE 2

export const typeDefs = [
  querySchema,
  postSchema,
  userSchema,
  mutationSchema,
  eventSchema, //CHANGED FOR MILESTONE 2
]
export const resolvers = [
  queryResolver,
  postResolver,
  userResolver,
  mutationResolver,
  eventResolver, //CHANGED FOR MILESTONE 2
]

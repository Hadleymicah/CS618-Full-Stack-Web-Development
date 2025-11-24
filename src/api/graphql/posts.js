import { gql } from '@apollo/client/core/index.js'

export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    contents
    tags
    likeCount #MODIFICATION FOR MILESTONE 2
    likedBy #MODIFICATION FOR MILESTONE 2
    updatedAt
    createdAt
    author {
      username
    }
  }
`

export const GET_POSTS = gql`
  ${POST_FIELDS}
  query getPosts($options: PostsOptions) {
    posts(options: $options) {
      ...PostFields
    }
  }
`

export const GET_POSTS_BY_AUTHOR = gql`
  ${POST_FIELDS}
  query getPostsByAuthor($author: String!, $options: PostsOptions) {
    postsByAuthor(username: $author, options: $options) {
      ...PostFields
    }
  }
`

export const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $imageUrl: String
    $ingredients: String
    $contents: String
    $tags: [String!]
  ) {
    createPost(
      title: $title
      imageUrl: $imageUrl
      ingredients: $ingredients
      contents: $contents
      tags: $tags
    ) {
      id
      title
    }
  }
`

//MODIFICATION FOR MILESTONE 2 - ADDED
export const LIKE_POST = gql`
  ${POST_FIELDS}
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      ...PostFields
    }
  }
`

export const UNLIKE_POST = gql`
  ${POST_FIELDS}
  mutation unlikePost($postId: ID!) {
    unlikePost(postId: $postId) {
      ...PostFields
    }
  }
`
//END MODIFICATION FOR MILESTONE 2 - ADDED

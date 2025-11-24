//CHANGED FOR MILESTONE 2
import { gql } from '@apollo/client/core/index.js'

export const GET_TOP_POSTS = gql`
  query GetTopPosts($limit: Int) {
    topPosts(limit: $limit) {
      id
      title
      contents
      ingredients
      imageUrl
      tags
      likeCount
      createdAt
      updatedAt
      author {
        id
        username
      }
    }
  }
`

export const GET_TOTAL_VIEWS = gql`
  query GetTotalViews($postId: ID!) {
    totalViews(postId: $postId) {
      views
    }
  }
`

export const GET_DAILY_VIEWS = gql`
  query GetDailyViews($postId: ID!) {
    dailyViews(postId: $postId) {
      _id
      views
    }
  }
`

export const GET_DAILY_DURATIONS = gql`
  query GetDailyDurations($postId: ID!) {
    dailyDurations(postId: $postId) {
      _id
      averageDuration
    }
  }
`

export const TRACK_EVENT = gql`
  mutation TrackEvent($postId: ID!, $action: String!, $session: String) {
    trackEvent(postId: $postId, action: $action, session: $session) {
      session
    }
  }
`
//END CHANGED FOR MILESTONE 2

import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query' //MILESTONE 2 - added useQueryClient back in

//MILETONE 2 - added imports
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { likePost, unlikePost } from '../api/posts.js'
//END MILESTONE 2 MODS

import { Header } from '../components/Header.jsx'
import { Post } from '../components/Post.jsx'
import { getPostById } from '../api/posts.js'
import { Helmet } from 'react-helmet-async'
import { getUserInfo } from '../api/users.js'
import { useEffect, useState } from 'react'
import { postTrackEvent } from '../api/events.js'
import { PostStats } from '../components/PostStats.jsx'

export function ViewPost({ postId }) {
  const [session, setSession] = useState()

  const trackEventMutation = useMutation({
    mutationFn: (action) => postTrackEvent({ postId, action, session }),
    onSuccess: (data) => setSession(data?.session),
  })

  useEffect(() => {
    let timeout = setTimeout(() => {
      trackEventMutation.mutate('startView')
      timeout = null
    }, 1000)
    return () => {
      if (timeout) clearTimeout(timeout)
      else trackEventMutation.mutate('endView')
    }
  }, [])

  const postQuery = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
  })
  const post = postQuery.data

  //ADDITION FOR MILESTONE 2 - LIKE UNLIKE BUTTONS
  const [token] = useAuth()
  const queryClient = useQueryClient()

  const currentUserId = token ? jwtDecode(token).sub : null

  const userHasLiked =
    currentUserId &&
    post?.likedBy?.some(
      (id) =>
        id === currentUserId || id?.toString() === currentUserId.toString(),
    )

  const likeMutation = useMutation({
    mutationFn: () => likePost(token, postId),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['post', postId], updatedPost)
    },
  })

  const unlikeMutation = useMutation({
    mutationFn: () => unlikePost(token, postId),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['post', postId], updatedPost)
    },
  })

  //END ADDITION FOR MILESTONE 2

  const userInfoQuery = useQuery({
    queryKey: ['users', post?.author],
    queryFn: () => getUserInfo(post?.author),
    enabled: Boolean(post?.author),
  })
  const userInfo = userInfoQuery.data ?? {}

  function truncate(str, max = 160) {
    if (!str) return str
    if (str.length > max) {
      return str.slice(0, max - 3) + '...'
    } else {
      return str
    }
  }

  return (
    <div style={{ padding: 8 }}>
      {post && (
        <Helmet>
          <title>{post.title} | Full-Stack React Blog</title>
          <meta name="description" content={truncate(post.contents)} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={post.title} />
          <meta property="og:article:published_time" content={post.createdAt} />
          <meta property="og:article:modified_time" content={post.updatedAt} />
          <meta property="og:article:author" content={userInfo.username} />
          {(post.tags ?? []).map((tag) => (
            <meta key={tag} property="og:article:tag" content={tag} />
          ))}
        </Helmet>
      )}
      <Header />
      <br />
      <hr />
      <Link to="/">Back to main page</Link>
      <br />
      <hr />
      {post ? (
        <div>
          <Post {...post} id={postId} author={userInfo} fullPost />
          {/* LIKE AND UNLIKE BUTTONS */}
          <div style={{ marginTop: 8, marginBottom: 8 }}>
            {token ? (
              <button
                type="button"
                onClick={() =>
                  userHasLiked ? unlikeMutation.mutate() : likeMutation.mutate()
                }
                disabled={likeMutation.isPending || unlikeMutation.isPending}
              >
                {userHasLiked ? 'Unlike' : 'Like'}
              </button>
            ) : (
              <em>Log in to like this recipe</em>
            )}{' '}
            <strong>
              {post.likeCount ?? 0}{' '}
              {(post.likeCount ?? 0) === 1 ? 'like' : 'likes'}
            </strong>
          </div>

          <hr />
          <hr />
          <PostStats postId={postId} />
        </div>
      ) : (
        `Post with id${postId} not found.`
      )}
    </div>
  )
}
ViewPost.propTypes = {
  postId: PropTypes.string.isRequired,
}

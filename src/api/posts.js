export const getPosts = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}

export const createPost = async (token, post) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })
  return await res.json()
}

export const getPostById = async (postId) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${res.status} ${res.statusText}`)
  }
  return await res.json()
}

//MOD FOR MILESTONE 2 - LIKE AND UNLIKE POST FUNCTIONS
export const likePost = async (token, postId) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/like`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!res.ok) {
    throw new Error('failed to like post')
  }

  return await res.json()
}

export const unlikePost = async (token, postId) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/like`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  if (!res.ok) {
    throw new Error('failed to unlike post')
  }

  return await res.json()
}
//END MOD FOR MILESTONE 2

/*
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext.jsx'
import { createPost } from '../api/posts.js'

export function CreatePost() {
  const [title, setTitle] = useState('')

  const [contents, setContents] = useState('')

  const [token] = useAuth()

  const queryClient = useQueryClient()

  const createPostMutation = useMutation({
    mutationFn: () => createPost(token, { title, contents }),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  if (!token) return <div>Please log in to create new posts.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-title">Title: </label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
  <br />
 
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />
      <input
        type="submit"
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title}
      />
      {createPostMutation.isSuccess ? (
        <>
          <br />
          Post created successfully!
        </>
      ) : null}
    </form>
  )
}


*/

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext.jsx'
import { createPost } from '../api/posts.js'

export function CreatePost() {
  const [title, setTitle] = useState('')

  const [contents, setContents] = useState('')

  // MODIFICATION FOR MILESTONE 1 - ADDING CONST LINES FOR INGREDIENTS AND IMAGEURL

  const [ingredients, setIngredients] = useState('')

  const [imageUrl, setImageUrl] = useState('')

  //END OF MOD FOR MILESTONE 1

  const [token] = useAuth()

  const queryClient = useQueryClient()

  // MODIFICATION FOR MILESTONE 1 - ADDING INGREDIENTS AND IMAGEURL TO CREATEPOSTMUTATION
  const createPostMutation = useMutation({
    mutationFn: () =>
      createPost(token, { title, contents, imageUrl, ingredients }),
    onSuccess: () => queryClient.invalidateQueries(['posts']),
  })

  // END OF MOD FOR MILESTONE 1

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  if (!token) return <div>Please log in to create new posts.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-title">Title: </label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="create-imageUrl"> Image URL: </label>
        <input
          type="text"
          id="create-imageUrl"
          name="create-imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="create-ingredients">Ingredients: </label>
        <br />
        <textarea
          id="create-ingredients"
          name="create-ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <br />
      <label htmlFor="create-contents">Description: </label>
      <br />
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <br />
      <br />
      <input
        type="submit"
        value={createPostMutation.isPending ? 'Creating...' : 'Create'}
        disabled={!title}
      />
      {createPostMutation.isSuccess ? (
        <>
          <br />
          Post created successfully!
        </>
      ) : null}
    </form>
  )
}

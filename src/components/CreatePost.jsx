import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import { Link } from 'react-router-dom'
import slug from 'slug'
import {
  CREATE_POST,
  GET_POSTS,
  GET_POSTS_BY_AUTHOR,
} from '../api/graphql/posts.js'

export function CreatePost() {
  const [title, setTitle] = useState('')

  const [contents, setContents] = useState('')

  // MODIFICATION FOR MILESTONE 1 - ADDING CONST LINES FOR INGREDIENTS AND IMAGEURL

  const [ingredients, setIngredients] = useState('')

  const [imageUrl, setImageUrl] = useState('')

  //END OF MOD FOR MILESTONE 1

  const [token] = useAuth()

  const [createPost, { loading, data }] = useGraphQLMutation(CREATE_POST, {
    variables: { title, contents, imageUrl, ingredients },
    context: { headers: { Authorization: `Bearer ${token}` } },
    refetchQueries: [GET_POSTS, GET_POSTS_BY_AUTHOR],
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createPost()
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
        value={loading ? 'Creating...' : 'Create'}
        disabled={!title || loading}
      />
      {data?.createPost ? (
        <>
          <br />
          Post{' '}
          <Link
            to={`/posts/${data.createPost.id}/${slug(data.createPost.title)}`}
          >
            {data.createPost.title}
          </Link>{' '}
          created successfully!
        </>
      ) : null}
    </form>
  )
}

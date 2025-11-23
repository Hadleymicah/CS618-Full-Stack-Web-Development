/* MODIFICATION FOR MILESTONE 1 - cCODE BEFORE MILESTONE 1
import PropTypes from 'prop-types'
import { User } from './User.jsx'


export function Post({ title, contents, author: userId }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {userId && (
        <em>
          <br />
          Written by <User id={userId} />
        </em>
      )}
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
}
*/

import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'

export function Post({
  title,
  contents,
  ingredients,
  imageUrl,
  author,
  _id,
  fullPost = false,
}) {
  return (
    <article>
      {fullPost ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/posts/${_id}/${slug(title)}`}>
          <h3>{title}</h3>
        </Link>
      )}
      {fullPost && imageUrl && (
        <img src={imageUrl} alt={title} style={{ maxwidth: '100%' }} />
      )}
      {fullPost && ingredients && (
        <div>
          <strong>Ingredients:</strong> {ingredients}
        </div>
      )}
      {contents && fullPost && (
        <div>
          <strong>Description:</strong> {contents}
        </div>
      )}
      {author && (
        <em>
          {fullPost && <br />}
          Written by <User id={author} />
        </em>
      )}
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  ingredients: PropTypes.string,
  imageUrl: PropTypes.string,
  author: PropTypes.string,
  _id: PropTypes.string.isRequired,
  fullPost: PropTypes.bool,
}

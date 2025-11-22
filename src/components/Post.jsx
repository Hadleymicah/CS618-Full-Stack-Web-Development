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

export function Post({
  title,
  contents,
  ingredients,
  imageUrl,
  author: userId,
}) {
  return (
    <article>
      <h3>{title}</h3>
      {imageUrl && (
        <img src={imageUrl} alt={title} style={{ maxwidth: '100%' }} />
      )}
      {ingredients && (
        <div>
          <strong>Ingredients:</strong> {ingredients}
        </div>
      )}
      <div>
        <strong>Description:</strong> {contents}
      </div>
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
  ingredients: PropTypes.string,
  imageUrl: PropTypes.string,
  author: PropTypes.string,
}

import { PostList } from '../components/PostList.jsx'
import { CreatePost } from '../components/CreatePost.jsx'
import { PostFilter } from '../components/PostFilter.jsx'
import { PostSorting } from '../components/PostSorting.jsx'
import { Header } from '../components/Header.jsx'

import { useState } from 'react'

import { Helmet } from 'react-helmet-async'
import { useQuery as useGraphQLQuery } from '@apollo/client/react/index.js'
import { GET_POSTS, GET_POSTS_BY_AUTHOR } from '../api/graphql/posts.js'
//ADDITIONS FOR MILESTONE 2
import { useQuery } from '@tanstack/react-query' //CHANGED FOR MILESTONE 2
import { getTopPosts } from '../api/events.js' //CHANGED FOR MILESTONE 2
//ADDITIONS FOR MILESTONE 2

export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const postsQuery = useGraphQLQuery(author ? GET_POSTS_BY_AUTHOR : GET_POSTS, {
    variables: { author, options: { sortBy, sortOrder } },
  })
  const posts = postsQuery.data?.postsByAuthor ?? postsQuery.data?.posts ?? []

  // MODIFICATION FOR MILESTONE 2 - ADDITION
  //CHANGED FOR MILESTONE 2
  const topPostsQuery = useQuery({
    queryKey: ['topPosts'],
    queryFn: () => getTopPosts(),
  })
  const topPosts = topPostsQuery.data ?? []
  //END CHANGED FOR MILESTONE 2
  // END MODIFICATION FOR MILESTONE 2 - ADDITION

  return (
    <div style={{ padding: 8 }}>
      <Helmet>
        <title>Full-Stack React Blog</title>
        <meta
          name="description"
          content="A blog full of articles about full-stack React development"
        />
      </Helmet>
      <Header />
      <br />
      <hr />
      <br />
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter
        field="author"
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt', 'likeCount']} //ADDTION FOR MILESTONE 2 - LIKECOUNT AS SORT OPTION
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      {/* CHANGED FOR MILESTONE 2 */}
      {topPosts.length > 0 && (
        <>
          <h2>Top 3 Most Viewed Recipes</h2>
          <PostList posts={topPosts} />
          <hr />
        </>
      )}
      <h2>All Recipes</h2>
      {/* END CHANGED FOR MILESTONE 2 */}
      <PostList posts={posts} />
    </div>
  )
}

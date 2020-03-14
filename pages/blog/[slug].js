import Post from '@components/post'
import getPosts from '@lib/get-posts'
import getPostsMeta from '@lib/get-posts-meta'
import renderMarkup from '@lib/render-markup'

const PostPage = props => {
  return <Post {...props} />
}

export const getStaticProps = ({ params: { slug } }) => {
  const posts = getPosts()
  const meta = getPostsMeta(posts)
  const post = posts.find(p => p.slug === slug)
  const { body, ...rest } = post

  return {
    props: {
      ...rest,
      meta,
      html: renderMarkup(body)
    }
  }
}

export const getStaticPaths = () => {
  return {
    paths: getPosts().map(p => `/blog/${p.slug}`),
    fallback: false
  }
}

export default PostPage

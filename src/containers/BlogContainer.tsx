import * as React from 'react'
import { Link } from 'gatsby'
import { get } from 'lodash'
import PostItem from '../components/PostItem'
import { MarkdownRemark, MarkdownRemarkConnection, Site, DataJson, ImageSharp } from '../graphql-types'
import * as classes from './blog.module.scss'
import Position from '../components/base/Position'
import BlogPagination from '../components/Pagination'
export interface IndexProps {
  data: {
    posts: MarkdownRemarkConnection
  }
  location: {
    pathname: string
  }
}

const BlogPage = (props: IndexProps) => {
  const { data } = props
  const pageCount = Math.ceil(props.data.posts.totalCount / 10)
  const { pathname } = props.location
  return (
    <div className={classes.indexContent}>
      <Position />
      <div className={classes.middleLine} />
      {data.posts.edges.map(({ node }: { node: MarkdownRemark }, index: number) => {
        const {
          frontmatter,
          timeToRead,
          fields: { slug },
          excerpt,
          wordCount,
        } = node
        const cover = get(frontmatter, 'image.children.0.fixed', {})
        const tags = node.frontmatter.tags
        return (
          <PostItem
            words={wordCount.words}
            key={slug}
            cover={cover}
            title={frontmatter.title}
            origin={frontmatter.origin}
            timeToRead={timeToRead}
            updatedDate={frontmatter.updatedDate}
            href={slug}
            excerpt={excerpt}
            Link={Link}
            tags={tags}
          />
        )
      })}
      <BlogPagination Link={Link} pathname={pathname} pageCount={pageCount} />
    </div>
  )
}
export default BlogPage

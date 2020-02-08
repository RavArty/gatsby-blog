import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
//import Image from "../components/image"
//import SEO from "../components/seo"

const Title = styled.h1`
  display: inline-block;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  &:hover {
    color: #1dcaff;
  }
`

const BlogLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const BlogBody = styled.div`
  margin-bottom: 50px;
`

export default ({ data }) => (
  <Layout>
    <div>
      <Title>My Thoughts</Title>
      <h4>{data.allMarkdownRemark.totalCount}</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <BlogBody key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
            </BlogTitle>
          </BlogLink>
          <p>{node.frontmatter.description || node.excerpt}</p>
        </BlogBody>
      ))}
    </div>
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          frontmatter {
            date
            description
            title
          }
          fields {
            slug
          }
          excerpt(truncate: true)
        }
      }
    }
  }
`

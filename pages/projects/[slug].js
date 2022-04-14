import React from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { ProjectContent } from '../../components/projects/ProjectContent'

import { fetchApi } from '../../lib/api'
import animate from '../../lib/Animate.js'

export default class Project extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const animateEls = document.getElementsByClassName('animate__animated')
    animate.initObserver(animateEls)
  }

  render() {
    const data = this.props.projectData.project

    return (
      <Layout>
        <Head>
          <title>{data.seo.title}</title>
          <meta name="og:title" content={data.seo.opengraphTitle} />
        </Head>

        <ProjectContent data={data} />
      </Layout>
    )
  }
}

export async function getStaticPaths() {
  const q = {
    query: `
      query ProjectsPathsQuery {
        projects(first: 40) {
          nodes {
            id
            slug
          }
        }
      }
    `
  }

  const data = await fetchApi(q)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  const paths = data.projects.nodes.map(item => {
    return {
      params: {
        id: item.id,
        slug: item.slug
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const q = {
    query: `
      query ProjectQuery($id: ID = "") {
        project(
          id: $id,
          idType: SLUG
        ) {
          content(format: RENDERED)
          databaseId
          title
          slug
          seo {
            metaRobotsNofollow
            metaRobotsNoindex
            opengraphDescription
            opengraphTitle
            title
          }
          acfProjects {
            gallery {
              id
              sourceUrl(size: LARGE_SOFT)
              srcSet(size: LARGE_SOFT)
              sizes(size: LARGE_SOFT)
              title
              altText
              mediaDetails {
                height
                width
              }
            }
            links {
              linkText
              url
            }
          }
          link
          featuredImage {
            node {
              sizes(size: LARGE_SOFT)
              sourceUrl
              srcSet(size: LARGE_SOFT)
              altText
              mediaDetails {
                height
                width
              }
            }
          }
          platforms {
            nodes {
              name
            }
          }
          technologies {
            nodes {
              name
            }
          }
          developmentTypes {
            nodes {
              name
            }
          }
        }
      }
    `,
    variables: {
      "id": params.slug
    }
  }

  const data = await fetchApi(q)

  return {
    props: {
      projectData: data
    },
    revalidate: 1800
  }
}

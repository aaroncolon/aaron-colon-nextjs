import React from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import ProjectsList from '../../components/projects/ProjectsList'

import { fetchApi } from '../../lib/api'
import animate from '../../lib/Animate.js'

export default class Projects extends React.Component {
  componentDidMount() {
    const animateEls = document.getElementsByClassName('animate__animated')
    animate.initObserver(animateEls)
  }

  render() {
    const pageData = this.props.pageData.nodes[0]
    const projectsData = this.props.projectsData
    return (
      <Layout classContentArea="full-width">
        <Head>
          <title>{pageData.seo.title}</title>
          <meta name="og:title" content={pageData.seo.opengraphTitle} />
        </Head>
        <header className="entry-header">
          <div className="container container--home">
            <h1 className="entry-title">Selected Projects</h1>
          </div>
        </header>
        <div className="entry-content entry-content--no-margin">
          <ProjectsList data={projectsData} />
        </div>
      </Layout>
    )
  }
}

export async function getStaticProps({ params }) {
  const q = {
    query: `
      query ProjectsIndexQuery {
        pages(
          first: 1,
          where: {
            name: "projects"
          }
        ) {
          nodes {
            title
            seo {
              metaRobotsNofollow
              metaRobotsNoindex
              opengraphDescription
              opengraphTitle
              title
            }
          }
        }
        projects(
          first: 40
        ) {
          nodes {
            title
            slug
            acfProjects {
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
          }
        }
      }
    `
  }

  const data = await fetchApi(q)

  return {
    props: {
      pageData: data.pages,
      projectsData: data.projects
    }
  }
}

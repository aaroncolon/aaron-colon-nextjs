import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import HomeHero from '../components/home/HomeHero'
import HomeProjects from '../components/home/HomeProjects'
import HomeServices from '../components/home/HomeServices'
import HomeTechStacks from '../components/home/HomeTechStacks'
import HomeMethods from '../components/home/HomeMethods'

import { fetchApi } from '../lib/api'
import animate from '../lib/Animate.js'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const animateEls = document.getElementsByClassName('animate__animated')
    animate.initObserver(animateEls)
  }

  render() {
    const data = this.props.pageHome
    return (
      <Layout classContentArea="full-width">
        <Head>
          <title>{data.page.seo.title}</title>
          <meta name="og:title" content={data.page.seo.opengraphTitle} />
        </Head>
        <div className="entry-content">
          <HomeHero data={data.page} />
          <HomeProjects data={data.projects} />
          <HomeServices data={data.services} />
          <HomeTechStacks data={data.techStacks} />
          <HomeMethods data={data.methods} />
        </div>
      </Layout>
    )
  }
}

// Static Generation / SSG / Pre-Rendering
export async function getStaticProps() {
  const q = {
    query: `
      query HomeQuery {
        page(id: "14", idType: DATABASE_ID) {
          content
          slug
          title
          pageId
          acfHome {
            heroTitle
            heroLede
            heroCta
          }
          seo {
            metaRobotsNofollow
            metaRobotsNoindex
            opengraphDescription
            opengraphTitle
            title
          }
        }
        methods {
          nodes {
            link
            title
            slug
            acfMethods {
              color
              fontawesomeIcon
              svgIcon
            }
          }
        }
        projects(
          first: 6
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
        services {
          nodes {
            link
            acfServices {
              fontawesomeIcon
              services {
                service
              }
            }
            slug
            title
            featuredImage {
              node {
                sizes
                sourceUrl
                srcSet
                altText
                link
                mediaDetails {
                  height
                  width
                }
              }
            }
          }
        }
        techStacks(
          where: {
            orderby: {field: TITLE, order: ASC}
          }
          first: 25
        ) {
          nodes {
            acfTechStacks {
              color
              fontawesomeIcon
              svgIcon
            }
            title
            slug
          }
        }
      }
    `
  }

  const data = await fetchApi(q)

  return {
    props: {
      pageHome: data
    }
  }
}

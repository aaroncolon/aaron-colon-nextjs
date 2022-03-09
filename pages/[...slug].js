import Head from 'next/head'
import Layout from '../components/Layout'

import { fetchApi } from '../lib/api'

export default function Page({ pageData, remoteContent }) {
  const rc = (remoteContent) ? <div dangerouslySetInnerHTML={{__html: remoteContent.content.rendered}} /> : null
  const metaRobots = (rc) ? `${pageData.seo.metaRobotsNoindex}, ${pageData.seo.metaRobotsNofollow}` : 'index, follow'

  return (
    <Layout classContentArea="single-column">
      <Head>
        <title>{pageData.seo.title}</title>
        <meta name="og:title" content={pageData.seo.opengraphTitle} />
        <meta name="robots" content={metaRobots} />
      </Head>

      <header className="entry-header">
        <h1 className="entry-title">{pageData.title}</h1>
      </header>
      <div className="entry-content">
        <div dangerouslySetInnerHTML={{__html: pageData.content}} />
        {rc}
      </div>
      <footer className="entry-footer" />
    </Layout>
  )
}

export async function getStaticPaths() {
  const q = {
    query: `
      query PagesQuery(
        $first: Int = 1,
        $notIn: [ID] = ""
      ) {
        pages(
          first: $first,
          where: {notIn: $notIn}
        ) {
          nodes {
            databaseId
            id
            slug
            uri
          }
        }
      }
    `,
    variables: {
      "first": 10,
      "notIn": ["498", "585", "14"]
    }
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

  const paths = data.pages.nodes.map(item => {
    const slugsArray = item.uri.split('/').filter(item => (item))

    return {
      params: {
        slug: slugsArray
      }
    }
  }).filter(item => (item.params.slug.length))

  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  let data,
      data2,
      template,
      remoteContentUrl,
      remoteContent = null

  const q = {
    query: `
      query PageQuery($name: String = "") {
        pages(
          first: 1,
          where: {
            name: $name
          }
        ) {
          nodes {
            content(format: RENDERED)
            databaseId
            title
            slug
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
            template {
              templateName
            }
            seo {
              metaRobotsNofollow
              metaRobotsNoindex
              opengraphDescription
              opengraphTitle
              title
            }
          }
        }
      }
    `,
    variables: {
      "name": params.slug[params.slug.length - 1]
    }
  }

  data = await fetchApi(q)

  // Check for Remote Content ACF
  template = (data.pages.nodes[0].template) ? data.pages.nodes[0].template.templateName : null

  if (template === 'Single Column - WP Rest') {
    const q2 = {
      query: `
        query PageRemoteContentQuery($name: String = "") {
          pages(
            first: 1,
            where: {
              name: $name
            }
          ) {
            nodes {
              template {
                templateName
                ... on Template_SingleColumnWPRest {
                  templateName
                  acfRemoteContent {
                    url
                    ttl
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        "name": params.slug[params.slug.length - 1]
      }
    }

    data2 = await fetchApi(q2)
  }

  remoteContentUrl = (template === 'Single Column - WP Rest') ? data2.pages.nodes[0].template.acfRemoteContent.url : null

  if (remoteContentUrl) {
    const resRemote = await fetch(remoteContentUrl)
    remoteContent = await resRemote.json()
  }

  return {
    props: {
      pageData: data.pages.nodes[0],
      remoteContent: remoteContent
    }
  }
}

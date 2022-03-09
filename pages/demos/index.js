import React from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Demo from '../../components/demos/Demo'

import { fetchApi } from '../../lib/api'

export default function Demos({ pageData, demosData }) {
  return (
    <Layout classContentArea="full-width">
      <Head>
        <title>{pageData.seo.title}</title>
        <meta name="og:title" content={pageData.seo.opengraphTitle} />
      </Head>

      <header className="entry-header">
        <div className="container">
          <h1 className="entry-title">Demonstrations</h1>
        </div>
      </header>
      <div className="entry-content entry-content--no-margin">
        <section className="section section-demos">
          <div className="container">
            <div className="row">
              {
                demosData.nodes.map((item, i) => {
                  return <Demo data={item} key={`demo-${i}`} />
                })
              }
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const q = {
    query: `
      query DemosQuery {
        pages(
          first: 1,
          where: {
            name: "demos"
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
        demos(
          first: 20,
          where: {
            orderby: {
              field: DATE,
              order: ASC
            }
          }
        ) {
          nodes {
            slug
            title
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
            platforms {
              nodes {
                name
              }
            }
            content(format: RENDERED)
            acfDemos {
              links {
                linkText
                url
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
      pageData: data.pages.nodes[0],
      demosData: data.demos
    },
    revalidate: 900
  }
}

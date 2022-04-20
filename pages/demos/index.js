import React, { useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Demo from '../../components/demos/Demo'
import DemoFilters from '../../components/demos/DemoFilters'

import { fetchApi } from '../../lib/api'

export default function Demos({ pageData, demosData }) {
  const [demos, setDemos] = useState(demosData)

  const { _demos, _filters } = parseDemosData(demosData)

  function handleClickFilter({ type, slug }) {
    // filter _demos to match type and slug
    const filteredIds = _demos.filter(item => {
      return item[type][slug]
    })

    // Filter demos by matched IDs
    let filteredDemos = {
      nodes: [] // match GraphQL response format for inital render compatibility
    }
    filteredIds.forEach(item => {
      for (let i = 0; i < demosData.nodes.length; i++) {
        if (item.id === demosData.nodes[i].demoId) {
          filteredDemos.nodes.push(demosData.nodes[i])
        }
      }
    })

    setDemos(filteredDemos)
  }

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
      <section className="section section-demos-filters">
        <div className="container">
          <DemoFilters filtersData={_filters} handleClickFilter={handleClickFilter} />
        </div>
      </section>

        <section className="section section-demos">
          <div className="container">
            <div className="row">
              {
                demos.nodes.map((item, i) => {
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

function parseDemosData(demosData) {
  let _demos,
      _filters = {
        tech: {},
        dev: {},
        platforms: {}
      }

  _demos = demosData.nodes.map(item => {
    const id   = item.demoId,
          slug = item.slug,
          show = true,
          techObj = {},
          devObj = {},
          platObj = {}

    item.technologies.nodes.forEach(item => {
      techObj[item.slug] = item.slug
      _filters.tech[item.slug] = {
        active: false,
        slug: item.slug,
        type: 'tech'
      }
    })

    item.developmentTypes.nodes.forEach(item => {
      devObj[item.slug] = item.slug
      _filters.dev[item.slug] = {
        active: false,
        slug: item.slug,
        type: 'dev'
      }
    })

    item.platforms.nodes.forEach(item => {
      platObj[item.slug] = item.slug
      _filters.platforms[item.slug] = {
        active: false,
        slug: item.slug,
        type: 'platforms'
      }
    })

    return {
      id,
      slug,
      show,
      tech : techObj,
      dev : devObj,
      platforms: platObj
    }
  })

  return {
    _demos,
    _filters
  }
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
            demoId
            slug
            title
            technologies {
              nodes {
                name
                slug
              }
            }
            developmentTypes {
              nodes {
                name
                slug
              }
            }
            platforms {
              nodes {
                name
                slug
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

import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

import Link from 'next/link'

const name = 'Aaron Colón'
export const siteTitle = 'Aaron Colón'

export default function Layout({ children, classContentArea = '' }) {
  return (
    <>
      <Head>
        <title>Aaron Colón &bull; Web Development &amp; Design</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="og:title" content="Aaron Colón &bull; Web Development &amp; Design" />
        <meta name="description" content="Web Development &bull; 12 Years &bull; Industry Standard &bull; Best Practices" />
        <meta name="robots" content="index, follow" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <div className="site clearfix">
        <Header />

        <div id="content" className="site-content">
          <div id="primary" className={`content-area content-area--${classContentArea}`}>
            <main id="main" className="site-main">
              <article className="hentry">
                {children}
              </article>
            </main>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

import Link from 'next/link'

export default function SiteBranding() {
  return  (
    <div className="site-branding">
      <h1 className="site-title">
        <Link href="/">
          <a className="site-title__link"><span className="site-title--first">Aaron</span> <span className="site-title--last">Colón</span></a>
        </Link>
        <p className="site-description visuallyhidden">Web Development and Design</p>
      </h1>
    </div>
  )
}

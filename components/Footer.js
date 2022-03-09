import NavigationFooter from './NavigationFooter'

export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <footer id="colophon" className="site-footer">
      <div className="site-footer-inner container-fluid">
        <div className="site-info">
          <p className="site-info__copy">&copy; {year} <b>Aaron Colón</b></p>
        </div>
        <NavigationFooter />
      </div>
    </footer>
  )
}

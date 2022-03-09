import SiteBranding from './SiteBranding'
import NavigationMain from './NavigationMain'

export default function Header() {
  return (
    <header className="site-header">
      <div className="clearfix">
        <SiteBranding />
        <NavigationMain />
      </div>
    </header>
  )
}

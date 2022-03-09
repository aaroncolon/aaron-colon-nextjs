import React from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { menuPrimary } from '../menus/menus'

class NavigationMain extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menuOpen : false
    }

    this.handleMenuToggle = this.handleMenuToggle.bind(this)
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this)
  }

  handleMenuToggle(e) {
    e.preventDefault()
    this.toggleMenu()
  }

  handleMenuItemClick(e) {
    e.preventDefault()

    // get paths without hash
    const currPath =
      (this.props.router.asPath.indexOf('#') !== -1) ? this.props.router.asPath.substring(0, this.props.router.asPath.indexOf('#')) : this.props.router.asPath
    const targetPath = e.target.href.replace(e.target.origin, '').replace(e.target.hash, '')
    const samePage = (currPath === targetPath) ? true : false

    // no target hash or target hash and href is different page
    if (!e.target.hash || (e.target.hash && !samePage)) {
      this.props.router.push(e.target.href)
    }
    else {
      // in-page navigation
      if (e.target.hash) {
        const el     = document.getElementById(e.target.hash.replace('#', ''))
        const rect   = el.getBoundingClientRect()
        const win    = el.ownerDocument.defaultView
        const top    = rect.top + win.pageYOffset
        const left   = rect.left + win.pageXOffset
        const offset = top - 66

        window.scrollTo({top: offset , left: 0, behavior: 'smooth'})
      }
    }
  }

  toggleMenu() {
    this.setState({
      menuOpen : !this.state.menuOpen
    })
  }

  doNavItems() {
    return menuPrimary.map((item, index) => {
      const href = item.slug

      if (href.indexOf('#') !== -1) {
        return (
          <li key={`item-${index}`} className={`menu-item menu-item-${index}`}>
            <a href={href} onClick={this.handleMenuItemClick}>{item.label}</a>
          </li>
        )
      } else {
        return (
          <li key={`item-${index}`} className={`menu-item menu-item-${index}`}>
            <Link href={href}>
              <a>{item.label}</a>
            </Link>
          </li>
        )
      }
    })
  }

  render() {
    const navBarClasses = (this.state.menuOpen) ? 'main-navigation toggled' : 'main-navigation'
    const navBtnClasses = (this.state.menuOpen) ? 'menu-toggle menu-toggle--open' : 'menu-toggle'

    return (
      <nav id="site-navigation" className={navBarClasses}>
        <button
          onClick={this.handleMenuToggle}
          className={navBtnClasses}
          aria-expanded={this.state.menuOpen}
          aria-controls="primary-menu">
          Menu
        </button>

        <div className="menu-primary-container">
          <ul id="primary-menu" className="menu nav-menu" aria-expanded={this.state.menuOpen}>
            {this.doNavItems()}
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(NavigationMain)

import React from 'react'
import Link from 'next/link'
import { getMenuByName } from '../lib/menus'


class NavigationFooter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      navItems : null
    }
  }

  async componentDidMount() {
    const navItems = await this.doNavItems("Secondary")
    this.setState({
      navItems: navItems
    })
  }

  async doNavItems(name) {
    const menuSecondary = await getMenuByName(name)

    return menuSecondary.menu.menuItems.nodes.map((item) => {
      return (
        <li key={item.id} className={`menu-item menu-item-${item.databaseId}`}>
          <Link href={item.url.replace('https://wp.aaron-colon.com', '')}>
            <a>{item.label}</a>
          </Link>
        </li>
      )
    })
  }

  render() {
    return (
      <nav id="footer-navigation" className="secondary-navigation">
        <div className="menu-secondary-container">
          <ul id="secondary-menu" className="menu">
            {this.state.navItems}
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavigationFooter

import React from 'react'
import Link from 'next/link'
import { menuSecondary } from '../menus/menus'


class NavigationFooter extends React.Component {
  constructor(props) {
    super(props)
  }

  doNavItems(name) {
    return menuSecondary.map((item, index) => {
      return (
        <li key={`item-${index}`} className={`menu-item menu-item-${index}`}>
          <Link href={item.slug}>
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
            {this.doNavItems()}
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavigationFooter

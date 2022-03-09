import React from 'react'

class Demo extends React.Component {
  constructor(props) {
    super(props)

    this.CLASS_REMARKS      = 'demo__copy-wrap'
    this.CLASS_REMARKS_OPEN = `${this.CLASS_REMARKS} ${this.CLASS_REMARKS}--visible`

    this.state = {
      remarksOpen: false,
      remarksClass: this.CLASS_REMARKS
    }

    this.handleRemarksToggle = this.handleRemarksToggle.bind(this)
  }

  handleRemarksToggle(e) {
    e.preventDefault()

    this.setState(state => ({
      remarksOpen: !state.remarksOpen,
      remarksClass: (!state.remarksOpen) ? this.CLASS_REMARKS_OPEN : this.CLASS_REMARKS
    }))
  }

  render() {
    const data         = this.props.data
    const technologies = data.technologies.nodes.map(item => item.name).join(', ')
    const devTypes     = data.developmentTypes.nodes.map(item => item.name).join(', ')
    const platforms    = data.platforms.nodes.map(item => item.name).join(', ')
    const links        = data.acfDemos.links.map((item, i) => {
      return (
        <li key={`link-${i}`} className="demo__link">
          <a target="_blank" rel="noopener noreferrer" href={item.url}>{item.linkText}</a>
        </li>
      )
    })

    return (
      <div className="demo-col col-xs-12 col-sm-6--demos col-sm-6 col-md-4">
        <div className="demo-wrapper">
          <div className="demo demo-0">
            <div className="demo__title-wrap">
              <h2 className="demo__title">{this.props.data.title}</h2>
            </div>
            <div className="demo__meta">
            <div className="demo__meta-row">
              <p className="demo__meta-row-list">
                <strong>Tech: </strong>{technologies}
              </p>
            </div>
            <div className="demo__meta-row">
              <p className="demo__meta-row-list"><strong>Dev: </strong>{devTypes}</p>
            </div>
            <div className="demo__meta-row">
              <p className="demo__meta-row-list"><strong>Platforms: </strong>{platforms}</p>
            </div>
          </div>
          <div className="demo__links-wrap">
            <ul className="demo__links">
              {links}
              <li className="demo__link">
                <a className="demo__link-remarks" href="#" onClick={this.handleRemarksToggle}>Remarks</a>
                <div className={this.state.remarksClass}>
                  <div className="demo__copy">
                    <div dangerouslySetInnerHTML={{__html: this.props.data.content}} />
                  </div>
                  <button className="demo__copy-close" onClick={this.handleRemarksToggle}>close</button></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Demo

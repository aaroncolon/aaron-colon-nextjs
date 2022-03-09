import { calcAnimationDelay } from '../../lib/utils'

export default function HomeMethods(props) {
  return (
    <section className="section section-home section-home-methods">
      <div className="container container--home">
        <h2 id="methods" className="title--section title--section-home">
          Methods
        </h2>

        <div className="row">
          {
            props.data.nodes.map((method, index) => {
              const animDelay = calcAnimationDelay(index, 4)
              const animDuration = '0.6'

              const icon    = method.acfMethods.fontawesomeIcon
              const color   = method.acfMethods.color
              const svgIcon = method.acfMethods.svgIcon
              const image   = method.acfMethods.image

              const iconHtml = ((icon) ?
                <div className="method__image method__image--font-icon" style={{color: color}}>
                  <span className={"fa-fw " + icon}></span>
                </div> : null
              )

              const svgHtml = ((svgIcon) ?
                <div className="method__image method__image--svg-icon">
                  <div dangerouslySetInnerHTML={{__html: svgIcon}} />
                </div> : null
              )

              const imageHtml = ((image) ?
                <div className="method__image method__image--image">
                  {image}
                </div> : null
              )

              const methodHeader = (iconHtml) ? iconHtml : (svgHtml) ? svgHtml : imageHtml

              return (
                <div key={method.title + index} className="col-xs-6 col-sm-4 col-sm-4--method col-md-3">
                  <div
                    className="method-wrapper animate__animated"
                    data-animate="fadeInUp"
                    data-animation-delay={animDelay}
                    data-animation-duration={animDuration}>

                    <div className="method__header">
                      <div className="method__header-inner">
                        {methodHeader}
                        <h3 className="title--method match-height match-height--by-row">{method.title}</h3>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })
          }
        </div>

      </div>
    </section>
  )
}

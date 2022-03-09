import { calcAnimationDelay } from '../../lib/utils'

export default function HomeTechStacks(props) {
  return (
    <section className="section section-home section-home-tech-stacks">
      <div className="container container--home">
        <h2 id="technologies" className="title--section title--section-home">
          Tech
        </h2>

        <div className="row">
          {
            props.data.nodes.map((stack, index) => {
              const animDelay = calcAnimationDelay(index, 4)
              const animDuration = '0.6';

              const icon    = stack.acfTechStacks.fontawesomeIcon
              const color   = stack.acfTechStacks.color
              const svgIcon = stack.acfTechStacks.svgIcon
              const image   = stack.featuredImage

              const iconHtml = ((icon) ?
                <div className="tech-stack__image tech-stack__image--font-icon" style={{color: color}}>
                  <span className={"fa-fw " + icon}></span>
                </div> : null
              )

              const svgHtml = ((svgIcon) ?
                <div className="tech-stack__image tech-stack__image--svg-icon">
                  <div dangerouslySetInnerHTML={{__html: svgIcon}} />
                </div> : null
              )

              const imageHtml = ((image) ?
                <div className="tech-stack__image tech-stack__image--image">
                  {image}
                </div> : null
              )

              const stackHeader = (iconHtml) ? iconHtml : (svgHtml) ? svgHtml : imageHtml

              return (
                <div key={stack.slug} className="col-xs-6 col-sm-4 col-sm-4--tech col-md-3">
                  <div
                    className="tech-stack-wrapper animate__animated"
                    data-animate="fadeInUp"
                    data-animation-delay={animDelay}
                    data-animation-duration={animDuration}>

                    <div className="tech-stack__header">
                      <div className="tech-stack__header-inner">
                        {stackHeader}
                        <h3 className="title--tech-stack">{stack.title}</h3>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })
          }

        </div>

        <hr className="section-divider" />

      </div>
    </section>
  )
}

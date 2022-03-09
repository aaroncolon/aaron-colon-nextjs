import { calcAnimationDelay } from '../../lib/utils'

export default function HomeServices(props) {
  return (
    <section className="section section-home section-home-services">
      <div className="container container--home">
        <h2 id="services" className="title--section title--section-home">
          Services
        </h2>

        <div className="row">
          {
            props.data.nodes.map((service, index) => {
              const animDelay    = calcAnimationDelay(index, 3)
              const animDuration = '0.6'
              const icon         = service.acfServices.fontawesomeIcon
              const image        = service.featuredImage

              const iconHtml = ((icon) ?
                <div className="service__image service__image--font-icon">
                  <span className={"fa-fw " + service.acfServices.fontawesomeIcon}></span>
                </div>
               : null)

              const imageHtml = ((image) ?
                <div className="service__image service__image--image">
                  <img
                    loading="lazy"
                    src={service.featuredImage.node.sourceUrl} srcSet={service.featuredImage.node.srcSet}
                    alt={service.featuredImage.node.altText}
                    sizes={service.featuredImage.node.sizes} />
                </div>
               : null)

              const defaultHtml = (
                <div className="service__image service__image--image">
                  <img loading="lazy" src="https://www.placehold.it/100x100" />
                </div>
              )

              const serviceHeader = (iconHtml) ? iconHtml : (imageHtml) ? imageHtml : defaultHtml

              return (
                <div key={service.title + index} className="col-xs-12 col-sm-6--services col-sm-6 col-md-4">
                  <div
                    className="service animate__animated"
                    data-animate="fadeInUp"
                    data-animation-delay={animDelay}
                    data-animation-duration={animDuration}>
                    <div className="service-wrapper">
                      <div className="service__header service__header--outline">
                        <div className="service__header-inner">
                          {serviceHeader}
                        </div>
                      </div>

                      <div className="service__body">
                        <h3 className="title--service">{service.title}</h3>
                        <ul className="service__list">
                          {
                            service.acfServices.services.map((item, index) => {
                              return (
                                <li key={item.service + index} className="service__list-item service__list-item--outline">{item.service}</li>
                              )
                            })
                          }
                        </ul>
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

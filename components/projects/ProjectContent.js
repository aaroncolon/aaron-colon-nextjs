import { calcAnimationDelay } from '../../lib/utils'

export function ProjectContent({ data }) {
  return (
    <>
      <header className="entry-header">
        <div className="container">
          <h1 className="entry-title">{data.title}</h1>
        </div>
      </header>

      <div className="entry-thumbnail">
        <div className="container">
          {
            data.acfProjects.gallery.map((item, index) => {
              const imageH = item.mediaDetails.height
              const imageW = item.mediaDetails.width
              const paddingBottom = ((imageH / imageW) * 100) + '%'
              const animDelay = calcAnimationDelay(index, 1)
              const animDuration = '0.6'

              return (
                <div
                  key={`gallery-item-${index}`}
                  className="post-thumbnail-wrap animate__animated"
                  style={{ paddingBottom: paddingBottom }}
                  data-animate="fadeInUp"
                  data-animation-delay={animDelay}
                  data-animation-duration={animDuration}>
                  <div className="post-thumbnail">
                    <img
                      loading="lazy"
                      src={item.sourceUrl}
                      srcSet={item.srcSet}
                      alt={item.altText}
                      sizes={item.sizes} />
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className="entry-content">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-3">
              <h2>Technologies</h2>
              <ul>
                {data.technologies.nodes.map(item => {
                  return (
                    <li key={item.name.replace(' ', '-')}>
                      {item.name}
                    </li>
                  )
                })}
              </ul>

              <h2>Development</h2>
              <ul>
                {data.developmentTypes.nodes.map(item => {
                  return (
                    <li key={item.name.replace(' ', '-')}>
                      {item.name}
                    </li>
                  )
                })}
              </ul>

              <h2>Platforms</h2>
              <ul>
                {data.platforms.nodes.map(item => {
                  return (
                    <li key={item.name.replace(' ', '-')}>
                      {item.name}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="col-xs-12 col-md-8">
              <h2>Remarks</h2>
              <div dangerouslySetInnerHTML={{__html: data.content }} />

              <h2>Links</h2>
              <ul className="links__list">
                {
                  data.acfProjects.links.map((item, index) => {
                    return (
                      <li key={`link-${index}`} className="links__list-item">
                        <a target="_blank" href={item.url}>{item.linkText}</a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>

          </div>
        </div>
      </div>

      <footer className="entry-footer"></footer>
    </>
  )
}

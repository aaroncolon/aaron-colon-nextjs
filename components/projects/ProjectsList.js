import Link from 'next/link'

import { calcAnimationDelay } from '../../lib/utils'

export default function ProjectsList({ data }) {
  return (
    <section className="section section-home section-home-projects">
      <div className="container container--home">
        <div className="row">
          {
            data.nodes.map((project, index) => {
              const classes = "project-col col-xs-12"
              const imageH = project.featuredImage.node.mediaDetails.height
              const imageW = project.featuredImage.node.mediaDetails.width
              const paddingBottom = ((imageH / imageW) * 100) + '%'
              const animationDelay = calcAnimationDelay(index, 2)
              const animationDuration = '0.6'

              return (
                <div className={classes} key={'project-' + index}>
                  <div className="project-wrapper">
                    <Link href={project.link.replace('https://wp.aaron-colon.com', '')}>
                      <a className="project-link">
                        <div
                          className={"project project-" + index + " animate__animated"}
                          style={{ paddingBottom: paddingBottom }}
                          data-animate="fadeInUp"
                          data-animation-delay={animationDelay}
                          data-animation-duration={animationDuration}>
                          <img
                            loading="lazy"
                            src={project.featuredImage.node.sourceUrl} srcSet={project.featuredImage.node.srcSet}
                            alt={project.featuredImage.node.altText}
                            sizes={project.featuredImage.node.sizes} />
                          <div className="project__title-wrap">
                            <h3 className="project__title">{project.title}</h3>
                          </div>
                        </div>
                      </a>
                    </Link>
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

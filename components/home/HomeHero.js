import { calcAnimationDelay } from '../../lib/utils'

export default function HomeHero(props) {
  return (
    <section className="section section-home section-home-intro">
      <div className="container container--home">
        <div className="hero-wrapper">
          <div className="hero-border hero-border--top"></div>

          <div className="hero">
            <div className="hero__copy">
              <p className="hero__title">{props.data.acfHome.heroTitle}</p>
              <p className="hero__lede">{props.data.acfHome.heroLede}</p>
              <p className="hero__cta">
                <a className="hero__cta-link" href="/contact">{props.data.acfHome.heroCta}</a>
              </p>
            </div>
          </div>

          <div className="hero-border hero-border--bottom"></div>
        </div>
      </div>
    </section>
  )
}

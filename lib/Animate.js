class Animate {
  constructor() {
    this.CLASS_BASE = 'animate__'
  }

  initObserver(animateEls) {
    if ("IntersectionObserver" in window) {
      let options = {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.20
      };

      let animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let el = entry.target;
            el.style.visibility = 'visible';
            el.style.animationDelay = el.dataset.animationDelay + 's';
            el.style.animationDuration = el.dataset.animationDuration + 's';
            el.classList.add(this.CLASS_BASE + el.dataset.animate);
            animationObserver.unobserve(el);
          }
        }, this);
      }, options);

      for (const animateEl of animateEls) {
        animationObserver.observe(animateEl);
      }
    } else {
      var observeThrottleTimeout;

      function observeFb() {
        if (observeThrottleTimeout) {
          clearTimeout(observeThrottleTimeout);
        }

        observeThrottleTimeout = setTimeout(() => {
          var scrollTop = window.pageYOffset;
          for (const animateEl of animateEls) {
            if (! animateEl.classList.contains('loaded') && this.isElementInViewport(animateEl)) {
              animateEl.style.visibility = 'visible';
              animateEl.style.animationDelay = animateEl.dataset.animationDelay + 's';
              animateEl.style.animationDuration = animateEl.dataset.animationDuration + 's';
              animateEl.classList.add(this.CLASS_BASE + animateEl.dataset.animate, 'loaded');
            }
          }
          if (animateEls.length == 0) {
            document.removeEventListener("scroll", observeFb);
            window.removeEventListener("resize", observeFb);
            window.removeEventListener("orientationChange", observeFb);
          }
        }, 20);
      }

      observeFb();
      document.addEventListener("scroll", observeFb);
      window.addEventListener("resize", observeFb);
      window.addEventListener("orientationChange", observeFb);
    }

  }

  isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      // El fully in viewport
      // rect.top >= 0 &&
      // rect.left >= 0 &&
      // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      // rect.right <= (window.innerWidth || document.documentElement.clientWidth)

      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  // animateCss(el, animation, prefix = 'animate__') {
  //   // We create a Promise and return it
  //   return new Promise((resolve, reject) => {
  //     const animationName = `${prefix}${animation}`;
  //     const node = document.querySelector(el);
  //
  //     node.classList.add(`${prefix}animated`, animationName);
  //
  //     // When the animation ends, we clean the classes and resolve the Promise
  //     function handleAnimationEnd(event) {
  //       event.stopPropagation();
  //       node.classList.remove(`${prefix}animated`, animationName);
  //       resolve('Animation ended');
  //     }
  //
  //     node.addEventListener('animationend', handleAnimationEnd, {once: true});
  //   });
  // }

}

const animate = new Animate()
export default animate

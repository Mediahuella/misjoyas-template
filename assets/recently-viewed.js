if (!window.Eurus.loadedScript.includes('recently-viewed.js')) {
  window.Eurus.loadedScript.push('recently-viewed.js');

  function getRecentlyViewedLimit(container) {
    const root = container || document.getElementById('shopify-section-recently-viewed');
    return parseInt(root?.getAttribute('x-products-to-show'), 10) || 10;
  }

  function stripRecentlyViewedCardHandlers(container) {
    if (!container) return;

    container.querySelectorAll('.card-product, .card-product *').forEach((el) => {
      for (const attr of [...el.attributes]) {
        if (attr.name.startsWith('x-intersect')) {
          el.removeAttribute(attr.name);
        }
      }
    });
  }

  function reorderRecentlyViewedSlides(container, productIds) {
    const list = container?.querySelector('.splide__list');
    if (!list || !productIds?.length) return;

    const order = new Map(productIds.map((id, index) => [String(id), index]));
    const slides = Array.from(list.children);

    slides.sort((slideA, slideB) => {
      const idA = slideA.querySelector('.link-product-variant')?.id?.split('-')?.[0];
      const idB = slideB.querySelector('.link-product-variant')?.id?.split('-')?.[0];
      const rankA = order.has(idA) ? order.get(idA) : Number.MAX_SAFE_INTEGER;
      const rankB = order.has(idB) ? order.get(idB) : Number.MAX_SAFE_INTEGER;
      return rankA - rankB;
    });

    slides.forEach((slide) => list.appendChild(slide));
  }

  function disableRecentlyViewedCardAnimations(container) {
    if (!container) return;

    container.querySelectorAll('.animate_transition_card__image').forEach((el) => {
      el.classList.remove('animate_transition_card__image');
      el.style.transform = 'scale(1)';
      el.style.transition = 'none';
    });

    container.querySelectorAll('.animate_transition_image').forEach((el) => {
      el.classList.remove('animate_transition_image');
      el.classList.add('active');
      el.style.opacity = '1';
      el.style.transition = 'none';
    });

    container.querySelectorAll('.card-product-img.x-splide').forEach((el) => {
      if (el.splide) {
        try {
          el.splide.destroy();
        } catch (_error) {
          /* noop */
        }
      }
    });
  }

  function finishRecentlyViewedRender(container) {
    if (!container || container.dataset.rvRenderDone === '1') return;
    container.dataset.rvRenderDone = '1';
    window.initRecentlyViewedCarousel(container);
  }

  function scheduleRecentlyViewedFinish(container) {
    const carousel = container?.querySelector('[data-recently-viewed-carousel]');
    const sectionId = carousel?.getAttribute('x-data-slider');
    const isStatic = carousel?.classList.contains('recently-viewed__carousel--static');

    if (!carousel || isStatic || !sectionId) {
      requestAnimationFrame(() => finishRecentlyViewedRender(container));
      return;
    }

    const onReady = () => finishRecentlyViewedRender(container);

    document.addEventListener(`eurus:${sectionId}:splide-ready`, onReady, { once: true });

    if (carousel.classList.contains('is-initialized') || carousel.splide) {
      onReady();
      return;
    }

    let attempts = 0;
    const timer = setInterval(() => {
      if (carousel.classList.contains('is-initialized') || carousel.splide || ++attempts > 150) {
        clearInterval(timer);
        onReady();
      }
    }, 100);
  }

  window.initRecentlyViewedCarousel = function (container) {
    const carousel = container?.querySelector('[data-recently-viewed-carousel]');
    if (!carousel) return;

    const desktop = parseInt(carousel.dataset.columnsDesktop, 10) || 4;
    const mobile = parseInt(carousel.dataset.columnsMobile, 10) || 2;

    function tryBind() {
      if (typeof window.bindFeaturedCollectionMjArrows !== 'function') return false;
      if (!carousel.splide) return false;
      window.bindFeaturedCollectionMjArrows(carousel, desktop, mobile);
      return true;
    }

    if (tryBind()) return;

    let attempts = 0;
    const timer = setInterval(() => {
      if (tryBind() || ++attempts > 150) clearInterval(timer);
    }, 100);
  };

  requestAnimationFrame(() => {
    document.addEventListener('alpine:init', () => {
      Alpine.store('xProductRecently', {
        show: false,
        productsToShow: 10,
        productsToShowMax: 10,
        init() {
          const root = document.getElementById('shopify-section-recently-viewed');
          if (root) {
            this.productsToShow = getRecentlyViewedLimit(root);
          }
        },
        showProductRecently() {
          this.show = !!localStorage.getItem('recently-viewed')?.length;
        },
        setProduct(productViewed) {
          let productList = [];

          if (localStorage.getItem('recently-viewed')?.length) {
            productList = JSON.parse(localStorage.getItem('recently-viewed'));
            productList = [...productList.filter((p) => p !== productViewed)].filter(
              (_p, i) => i < this.productsToShowMax
            );
          }

          localStorage.setItem('recently-viewed', JSON.stringify([productViewed, ...productList]));
          this.show = true;
        },
        getProductRecently(sectionId, productId) {
          const el = document.getElementById('shopify-section-recently-viewed');
          if (!el) return;

          const limit = getRecentlyViewedLimit(el);
          this.productsToShow = limit;

          let products = [];
          if (localStorage.getItem('recently-viewed')?.length) {
            products = JSON.parse(localStorage.getItem('recently-viewed'));
            products = productId ? products.filter((p) => p !== productId) : products;
            products = products.slice(0, limit);
          } else {
            this.show = false;
            return;
          }

          if (!products.length) {
            this.show = false;
            return;
          }

          const query = products.map((value) => 'id:' + value).join(' OR ');
          const searchUrl = `${Shopify.routes.root}search?section_id=${sectionId}&type=product&q=${encodeURIComponent(query)}`;

          fetch(searchUrl)
            .then((response) => {
              if (!response.ok) throw new Error(response.status);
              return response.text();
            })
            .then((text) => {
              const parsed = new DOMParser()
                .parseFromString(text, 'text/html')
                .querySelector('#shopify-section-recently-viewed');

              if (!parsed) return;

              el.innerHTML = parsed.innerHTML;
              el.dataset.rvRenderDone = '0';
              reorderRecentlyViewedSlides(el, products);
              stripRecentlyViewedCardHandlers(el);
              disableRecentlyViewedCardAnimations(el);

              if (window.Alpine) Alpine.initTree(el);

              stripRecentlyViewedCardHandlers(el);
              disableRecentlyViewedCardAnimations(el);
              scheduleRecentlyViewedFinish(el);
            })
            .catch((error) => {
              console.error(error);
            });
        },
        clearStory() {
          const result = confirm('Are you sure you want to clear your recently viewed products?');
          if (result === true) {
            localStorage.removeItem('recently-viewed');
            this.show = false;
          }
        },
      });
    });
  });
}

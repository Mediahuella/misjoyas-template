// Sube el botón flotante de WhatsApp (app WhatsUp) por encima de la barra sticky
// de "agregar al carro" en mobile, para que no se interpongan. El botón vive dentro
// de un shadow DOM con `bottom: 16px` fijo, así que se controla via custom property
// (las CSS custom properties sí cruzan el shadow boundary).
(function () {
  if (window.__mjWaStickyOffset) return;
  window.__mjWaStickyOffset = true;

  const GAP = 12; // separación entre el botón y la barra
  const BASE_BOTTOM = 16; // bottom original del botón (app)
  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

  let waEl = null;
  let styleInjected = false;

  function injectShadowStyle(el) {
    if (styleInjected || !el || !el.shadowRoot) return;
    const target = el.shadowRoot.querySelector('.whatsup-whatsapp-button');
    if (!target) return;
    const style = document.createElement('style');
    style.textContent =
      '.whatsup-whatsapp-button{bottom:var(--mj-wa-bottom,' + BASE_BOTTOM + 'px)!important;' +
      'transition:bottom .3s cubic-bezier(0.075,0.82,0.165,1);}';
    el.shadowRoot.appendChild(style);
    styleInjected = true;
  }

  function update() {
    if (!waEl) return;
    const bar = document.querySelector('[id^="sticky-add-to-cart-"]');
    let bottom = BASE_BOTTOM;
    if (isMobile() && bar && getComputedStyle(bar).display !== 'none') {
      const h = bar.getBoundingClientRect().height;
      if (h > 0) bottom = Math.round(h + GAP);
    }
    waEl.style.setProperty('--mj-wa-bottom', bottom + 'px');
  }

  function start() {
    waEl = document.querySelector('whatsup-whatsapp-button');
    if (!waEl) return false;
    injectShadowStyle(waEl);
    if (!styleInjected) return false;

    const bar = document.querySelector('[id^="sticky-add-to-cart-"]');
    if (bar) {
      new MutationObserver(update).observe(bar, {
        attributes: true,
        attributeFilter: ['style', 'class'],
      });
    }
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('scroll', update, { passive: true });
    update();
    return true;
  }

  // La app y el custom element cargan de forma diferida; reintentar hasta que existan.
  if (!start()) {
    let tries = 0;
    const timer = setInterval(() => {
      if (start() || ++tries > 60) clearInterval(timer);
    }, 500);
  }
})();

document.addEventListener('alpine:init', () => {
  Alpine.store('xSearchBar', {
    mobileOpen: false,
    toggle() { this.mobileOpen = !this.mobileOpen; },
    close() { this.mobileOpen = false; }
  });

  Alpine.data('xInlineSearch', (type, maxResults) => ({
    query: '',
    result: '',
    cachedResults: {},
    openResults: false,
    loading: false,
    _t: null,

    keyUp() {
      clearTimeout(this._t);
      this._t = setTimeout(() => {
        const q = this.query.trim();
        if (q) {
          this.getSearchResult(q);
        } else {
          this.result = '';
          this.openResults = false;
        }
      }, 300);
    },

    focusForm() {
      if (this.query && this.result) this.openResults = true;
    },

    closeResults() {
      this.openResults = false;
    },

    getSearchResult(query) {
      const key = query.toLowerCase().replace(/\s+/g, '-') + '_' + maxResults;
      if (this.cachedResults[key]) {
        this.result = this.cachedResults[key];
        this.openResults = true;
        return;
      }
      this.loading = true;
      const field = 'author,body,product_type,tag,title,variants.barcode,variants.sku,variants.title,vendor';
      const url = `${Shopify.routes.root}search/suggest?q=${encodeURIComponent(query)}&${encodeURIComponent('resources[type]')}=${encodeURIComponent('product,collection')}&${encodeURIComponent('resources[options][fields]')}=${encodeURIComponent(field)}&${encodeURIComponent('resources[limit]')}=${encodeURIComponent(maxResults)}&section_id=predictive-search`;
      fetch(url)
        .then(r => r.text())
        .then(text => {
          const doc = new DOMParser().parseFromString(text, 'text/html');
          const el = doc.querySelector('#shopify-section-predictive-search');
          if (el) {
            this.result = el.innerHTML;
            this.cachedResults[key] = this.result;
            this.openResults = true;
          }
          this.loading = false;
        })
        .catch(() => { this.loading = false; });
    }
  }));

  Alpine.data('xProductShare', () => ({
    open: false,

    async handleShare() {
      const root = this.$el;
      const title = root.dataset.shareTitle || document.title;
      const url = root.dataset.shareUrl || window.location.href;

      if (navigator.share) {
        try {
          await navigator.share({ title, url });
          this.open = false;
          return;
        } catch (error) {
          if (error?.name === 'AbortError') return;
        }
      }

      this.open = !this.open;
    },
  }));

  Alpine.data('xProductWishlist', () => ({
    added: false,
    _observer: null,
    _initialized: false,
    _pollTimer: null,

    init() {
      this.$nextTick(() => this.bootstrap());
      document.addEventListener('wishlist-hero-wishlist-sdk-ready', () => this.bootstrap());
      window.addEventListener('wishlist-hero-wishlist-sdk-ready', () => this.bootstrap());

      this._pollTimer = window.setInterval(() => {
        this.bootstrap();
      }, 300);

      window.setTimeout(() => {
        window.clearInterval(this._pollTimer);
      }, 20000);

      this.watchStrayWishlist();
      this.watchVariantChange();
    },

    bootstrap() {
      const mounted = this.claimAutoButton() || this.initWithSdk() || this.initWithCustomEvent();
      this.purgeStrayWishlist();
      return mounted;
    },

    isInsideWishlistSlot(node) {
      return !!node?.closest?.('.misjoyas-product-wishlist__slot');
    },

    isStrayWishlistNode(node) {
      if (!node || node.nodeType !== 1 || this.isInsideWishlistSlot(node)) return false;

      const tag = node.tagName?.toLowerCase();
      if (tag === 'wishlist-button-block') return true;

      if (node.classList?.contains('wishlist-hero-custom-button') && !node.classList.contains('misjoyas-wishlist-hero-engine')) {
        return true;
      }

      if (node.classList?.contains('wishlist-engine-button') || node.classList?.contains('wishlist-page-widget')) {
        return true;
      }

      const label = `${node.getAttribute?.('aria-label') || ''} ${node.textContent || ''}`;
      return /wishlist|deseados|lista de deseados|añadir a favoritos|agregar a la lista|add to wishlist/i.test(label);
    },

    purgeStrayWishlist() {
      const productInfo = document.querySelector('.section-product-info .product-info');
      if (!productInfo) return;

      const seen = new Set();

      productInfo.querySelectorAll('wishlist-button-block, .shopify-block.shopify-app-block, .wishlist-hero-custom-button, button, [role="button"]').forEach((node) => {
        if (!this.isStrayWishlistNode(node)) return;

        const block = node.closest('.shopify-block.shopify-app-block')
          || node.closest('wishlist-button-block')
          || node;

        if (this.isInsideWishlistSlot(block) || seen.has(block)) return;

        seen.add(block);
        block.setAttribute('aria-hidden', 'true');
        block.style.display = 'none';
      });
    },

    watchStrayWishlist() {
      const productInfo = document.querySelector('.section-product-info .product-info');
      if (!productInfo) return;

      new MutationObserver(() => this.purgeStrayWishlist()).observe(productInfo, {
        childList: true,
        subtree: true,
      });
    },

    claimAutoButton() {
      const slot = this.$refs.slot;
      if (!slot || slot.children.length) return slot?.children.length > 0;

      const productInfo = document.querySelector('.section-product-info .product-info');
      if (!productInfo) return false;

      const wlhNode = [...productInfo.querySelectorAll('wishlist-button-block')].find((node) => (
        !this.$el.contains(node)
      ));

      if (wlhNode) {
        const mountTarget = wlhNode.closest('.shopify-block.shopify-app-block') || wlhNode;
        mountTarget.classList.add('misjoyas-wishlist-mounted');
        slot.appendChild(mountTarget);
        this.attachStateObserver(mountTarget);
        this._initialized = true;
        this.purgeStrayWishlist();
        return true;
      }

      const appBlock = [...productInfo.querySelectorAll('.shopify-block.shopify-app-block')].find((node) => (
        !this.$el.contains(node)
        && (
          node.querySelector('[class*="wishlist"]')
          || /wishlist|deseados|lista de deseados/i.test(node.textContent || '')
        )
      ));

      if (appBlock) {
        appBlock.classList.add('misjoyas-wishlist-mounted');
        slot.appendChild(appBlock);
        this.attachStateObserver(appBlock);
        this._initialized = true;
        this.purgeStrayWishlist();
        return true;
      }

      return false;
    },

    initWithSdk() {
      if (this._initialized || !window.WishListHero_SDK?.InitializeAddToWishListButton) {
        return false;
      }

      const root = this.$el;
      const engine = this.$refs.engine;
      if (!engine || engine.dataset.wlhReady === 'true') return engine?.dataset.wlhReady === 'true';

      try {
        window.WishListHero_SDK.InitializeAddToWishListButton({
          ButtonClassElement: 'misjoyas-wishlist-hero-engine',
          ProductId: Number(root.dataset.wlhProductId),
          ProductLink: root.dataset.wlhLink,
          ProductVariantId: Number(root.dataset.wlhVariantId),
          ProductPrice: Number(root.dataset.wlhPrice),
          ProductTitle: root.dataset.wlhName,
          ProductImage: root.dataset.wlhImage,
          ButtonMode: 'icon_only',
        });

        engine.dataset.wlhReady = 'true';
        engine.hidden = false;
        engine.classList.add('misjoyas-wishlist-mounted');
        this.$refs.slot?.appendChild(engine);
        this.attachStateObserver(engine);
        this._initialized = true;
        return true;
      } catch (error) {
        return false;
      }
    },

    initWithCustomEvent() {
      const engine = this.$refs.engine;
      if (!engine || engine.dataset.wlhReady === 'true') return engine?.dataset.wlhReady === 'true';

      document.dispatchEvent(new CustomEvent('wishlist-hero-add-to-custom-element', {
        detail: engine,
      }));

      window.setTimeout(() => {
        const hasButton = engine.querySelector('button, [role="button"], wishlist-button-block');
        if (hasButton) {
          engine.dataset.wlhReady = 'true';
          engine.hidden = false;
          engine.classList.add('misjoyas-wishlist-mounted');
          this.$refs.slot?.appendChild(engine);
          this.attachStateObserver(engine);
          this._initialized = true;
        }
      }, 500);

      return engine.dataset.wlhReady === 'true';
    },

    attachStateObserver(target) {
      this._observer?.disconnect();
      this._observer = new MutationObserver(() => this.syncAddedState(target));
      this._observer.observe(target, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['class', 'aria-pressed', 'aria-checked', 'data-added', 'added'],
      });
      target.addEventListener('click', () => {
        window.setTimeout(() => this.syncAddedState(target), 150);
        window.setTimeout(() => this.syncAddedState(target), 600);
      }, true);
      this.syncAddedState(target);
    },

    syncAddedState(target) {
      const scope = target || this.$refs.slot || this.$el;
      const btn = scope.querySelector('button, [role="button"]');
      const block = scope.querySelector('wishlist-button-block') || scope.closest('wishlist-button-block');
      const label = btn?.getAttribute('aria-label') || btn?.textContent || '';

      this.added = btn?.getAttribute('aria-pressed') === 'true'
        || btn?.getAttribute('aria-checked') === 'true'
        || block?.getAttribute('aria-checked') === 'true'
        || block?.getAttribute('data-added') === 'true'
        || block?.hasAttribute('added')
        || btn?.classList.contains('wlh-added')
        || btn?.classList.contains('added')
        || btn?.classList.contains('active')
        || scope.querySelector('.wlh-icon-heart-full, .wlh-svg-icon-heart-full, [class*="heart-full"], [class*="heart-filled"]') !== null
        || /remove|quitar|eliminar|remov/i.test(label);
    },

    watchVariantChange() {
      const form = document.querySelector('.product-form, form[action*="/cart/add"]');
      const idInput = form?.querySelector('input[name="id"]');
      if (!idInput) return;

      idInput.addEventListener('change', () => this.updateVariant(idInput.value));
      document.addEventListener('variant:change', (event) => {
        const variantId = event.detail?.variant?.id;
        if (variantId) this.updateVariant(variantId);
      });
    },

    updateVariant(variantId) {
      if (!variantId) return;

      const root = this.$el;
      root.dataset.wlhVariantId = variantId;

      const engine = this.$refs.engine;
      if (engine) {
        engine.setAttribute('data-wlh-variantid', variantId);
      }

      if (window.WishListHero_SDK?.InitializeAddToWishListButton) {
        this._initialized = false;
        if (engine) engine.dataset.wlhReady = 'false';
        this.initWithSdk();
      }
    },

    destroy() {
      this._observer?.disconnect();
      window.clearInterval(this._pollTimer);
    },
  }));
});

/**
 * Flechas custom para featured-collection-misjoyas (Splide arrows: false).
 */
window.bindFeaturedCollectionMjArrows = function (root, desktopMove, mobileMove) {
  if (!root?.splide) return;

  const prev = root.querySelector('[data-fc-mj-arrow="prev"]');
  const next = root.querySelector('[data-fc-mj-arrow="next"]');
  const getMove = () => (window.innerWidth >= 768 ? desktopMove : mobileMove);

  const updateDisabled = () => {
    const end = root.splide.Components.Controller.getEnd();
    const index = root.splide.index;
    if (prev) {
      prev.disabled = index <= 0;
      prev.setAttribute('aria-disabled', index <= 0 ? 'true' : 'false');
    }
    if (next) {
      next.disabled = index >= end;
      next.setAttribute('aria-disabled', index >= end ? 'true' : 'false');
    }
  };

  if (prev && !prev.dataset.fcMjBound) {
    prev.dataset.fcMjBound = '1';
    prev.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      root.splide.go('-' + getMove());
    });
  }

  if (next && !next.dataset.fcMjBound) {
    next.dataset.fcMjBound = '1';
    next.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      root.splide.go('+' + getMove());
    });
  }

  if (!root.dataset.fcMjMoveBound) {
    root.dataset.fcMjMoveBound = '1';
    root.splide.on('move refresh resized', updateDisabled);
  }

  updateDisabled();
};

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

  const prev =
    root.querySelector('[data-fc-mj-arrow="prev"]') ||
    root.querySelector('.splide__arrow--prev');
  const next =
    root.querySelector('[data-fc-mj-arrow="next"]') ||
    root.querySelector('.splide__arrow--next');
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
      if (window.innerWidth < 768) return;
      event.preventDefault();
      event.stopPropagation();
      root.splide.go('-' + getMove());
    });
  }

  if (next && !next.dataset.fcMjBound) {
    next.dataset.fcMjBound = '1';
    next.addEventListener('click', (event) => {
      if (window.innerWidth < 768) return;
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

/**
 * Debugger del cart drawer Mis Joyas.
 *
 * Uso en consola:
 *   MisJoyasCartDebug.run()           — informe completo
 *   MisJoyasCartDebug.watch()         — log al abrir/cerrar/recargar carrito
 *   MisJoyasCartDebug.unwatch()
 *   MisJoyasCartDebug.fetchSection()  — compara HTML del section API
 *
 * Activar watch al cargar:
 *   localStorage.setItem('misjoyas_cart_debug', '1'); location.reload();
 *   — o añadir ?mj_cart_debug=1 a la URL
 */
(function initMisJoyasCartDebug() {
  const LOG = '[MisJoyas Cart Debug]';
  const STORAGE_KEY = 'misjoyas_cart_debug';

  const isEnabled = () => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return true;
    } catch (e) { /* ignore */ }
    return new URLSearchParams(window.location.search).has('mj_cart_debug');
  };

  const getDrawer = () => document.getElementById('CartDrawer');

  const getMiniCartStore = () => (
    window.Alpine?.store?.('xMiniCart') || null
  );

  const getCartBubbleCount = () => {
    const bubble = document.querySelector('#cart-icon-bubble [aria-hidden="true"]')
      || document.querySelector('#cart-icon-bubble span');
    return parseInt(bubble?.textContent || '0', 10) || 0;
  };

  const scanStylesheets = () => {
    const mainCssLinks = [...document.querySelectorAll('link[rel="stylesheet"]')]
      .filter((link) => /main\.css/i.test(link.href))
      .map((link) => ({ href: link.href, loaded: !!link.sheet }));

    const misjoyasSelectors = [];
    const blockedSheets = [];

    for (const sheet of document.styleSheets) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch (error) {
        blockedSheets.push({ href: sheet.href || '(inline)', reason: error.message });
        continue;
      }

      for (const rule of rules || []) {
        const selector = rule.selectorText || '';
        if (selector.includes('misjoyas-cart')) {
          misjoyasSelectors.push({ href: sheet.href || '(inline)', selector });
        }
      }
    }

    return {
      mainCssLinks,
      misjoyasRuleCount: misjoyasSelectors.length,
      misjoyasSample: misjoyasSelectors.slice(0, 5),
      blockedSheets,
    };
  };

  const inspectStyles = (drawer) => {
    if (!drawer) return null;

    const panel = drawer.querySelector('#update-cart, .misjoyas-cart__panel');
    const title = drawer.querySelector('.misjoyas-cart__title');
    const progress = drawer.querySelector('.misjoyas-cart-progress');

    const read = (el) => {
      if (!el) return null;
      const style = getComputedStyle(el);
      return {
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        maxWidth: style.maxWidth,
        width: style.width,
        zIndex: style.zIndex,
        fontSize: style.fontSize,
        color: style.color,
      };
    };

    return {
      drawer: read(drawer),
      panel: read(panel),
      title: read(title),
      progress: read(progress),
    };
  };

  const inspectAlpine = (drawer) => {
    const miniCart = getMiniCartStore();
    const alpineData = drawer && window.Alpine?._x_dataStack?.[0];

    return {
      alpineLoaded: !!window.Alpine,
      miniCart: miniCart ? {
        open: miniCart.open,
        loading: miniCart.loading,
        type: miniCart.type,
        needReload: miniCart.needReload,
      } : null,
      drawerXData: alpineData ? Object.keys(alpineData) : null,
      xCloakPresent: drawer?.hasAttribute('x-cloak') ?? false,
    };
  };

  const inspectDom = () => {
    const drawers = [...document.querySelectorAll('#CartDrawer')];
    const drawer = drawers[0] || null;

    return {
      drawerCount: drawers.length,
      drawerPresent: !!drawer,
      classes: drawer?.className || null,
      hasMisjoyasRootClass: drawer?.classList.contains('misjoyas-cart') ?? false,
      hasLegacyMjClass: drawer?.className.includes('mj-cart') ?? false,
      progressPresent: !!drawer?.querySelector('.misjoyas-cart-progress'),
      progressLegacyMj: !!drawer?.querySelector('.mj-cart__progress'),
      panelPresent: !!drawer?.querySelector('.misjoyas-cart__panel, #update-cart'),
      renderedIn: drawer?.closest('#ajax-loading-cart')
        ? 'section cart-drawer (#ajax-loading-cart)'
        : drawer
          ? 'snippet directo (theme.liquid)'
          : null,
      innerHTMLLength: drawer?.innerHTML?.length || 0,
    };
  };

  const inspectOpenLogic = () => {
    const drawer = getDrawer();
    const itemCount = getCartBubbleCount();
    const hasProgress = !!drawer?.querySelector('.misjoyas-cart-progress');
    const miniCart = getMiniCartStore();

    return {
      itemCount,
      hasProgress,
      wouldForceReloadOnOpen: itemCount > 0 && !hasProgress,
      reloadBlockedByLoading: !!miniCart?.loading,
      onCartPage: window.location.pathname === '/cart',
      cartTypeSettingGuess: drawer?.classList.contains('drawer')
        ? 'drawer'
        : drawer?.classList.contains('popup')
          ? 'popup'
          : null,
    };
  };

  const summarizeIssues = (report) => {
    const issues = [];

    if (!report.dom.drawerPresent) {
      issues.push('No existe #CartDrawer en el DOM.');
    }
    if (report.dom.drawerCount > 1) {
      issues.push(`Hay ${report.dom.drawerCount} elementos #CartDrawer (IDs duplicados).`);
    }
    if (report.dom.drawerPresent && !report.dom.hasMisjoyasRootClass) {
      issues.push('El drawer no tiene la clase raíz .misjoyas-cart — el CSS de Figma no aplicará.');
    }
    if (report.dom.hasLegacyMjClass) {
      issues.push('Aún hay clases legacy .mj-cart* en el drawer.');
    }
    if (report.stylesheets.misjoyasRuleCount === 0) {
      issues.push('No se encontraron reglas CSS .misjoyas-cart en stylesheets accesibles (main.css no cargado o desactualizado).');
    }
    if (report.stylesheets.mainCssLinks.length === 0) {
      issues.push('No hay <link> a main.css en la página.');
    }
    if (report.openLogic.wouldForceReloadOnOpen) {
      issues.push('openCart() forzará reLoad() porque falta .misjoyas-cart-progress en el drawer actual.');
    }
    if (!report.alpine.miniCart) {
      issues.push('Alpine.store("xMiniCart") no está disponible.');
    }
    if (report.alpine.miniCart && report.alpine.drawerXData && !report.alpine.drawerXData.includes('loading')) {
      issues.push('x-data="xCart" podría no estar inicializado en #CartDrawer.');
    }
    if (report.dom.drawerPresent && report.computed?.drawer?.display === 'none' && report.alpine.miniCart?.open) {
      issues.push('El store dice open=true pero #CartDrawer tiene display:none.');
    }
    if (report.dom.drawerPresent && report.computed?.panel?.maxWidth === '384px') {
      issues.push('Panel sigue con max-width ~384px (md:w-96 del tema base) — CSS Mis Joyas no está ganando.');
    }

    return issues;
  };

  const run = (context = {}) => {
    const drawer = getDrawer();
    const report = {
      at: new Date().toISOString(),
      trigger: context.trigger || 'manual',
      url: window.location.href,
      dom: inspectDom(),
      alpine: inspectAlpine(drawer),
      openLogic: inspectOpenLogic(),
      stylesheets: scanStylesheets(),
      computed: inspectStyles(drawer),
    };

    report.issues = summarizeIssues(report);

    console.group(`${LOG} ${report.trigger}`);
    console.log('Resumen DOM', report.dom);
    console.log('Alpine / estado', report.alpine);
    console.log('Lógica openCart / reLoad', report.openLogic);
    console.log('CSS cargado', report.stylesheets);
    console.log('Estilos computados', report.computed);

    if (report.issues.length) {
      console.warn('Posibles causas:', report.issues);
    } else {
      console.info('No se detectaron problemas obvios. Si el diseño sigue mal, ejecuta MisJoyasCartDebug.fetchSection().');
    }

    console.groupEnd();
    return report;
  };

  const fetchSection = async () => {
    console.group(`${LOG} fetchSection()`);

    try {
      const response = await fetch(`${window.location.pathname}?sections=cart-drawer`);
      const json = await response.json();
      const html = json['cart-drawer'] || '';
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const sectionDrawer = doc.querySelector('#CartDrawer');
      const liveDrawer = getDrawer();

      const sectionInfo = {
        htmlLength: html.length,
        hasCartDrawer: !!sectionDrawer,
        sectionClasses: sectionDrawer?.className || null,
        sectionHasMisjoyas: sectionDrawer?.classList.contains('misjoyas-cart') ?? false,
        sectionHasProgress: html.includes('misjoyas-cart-progress'),
        sectionHasLegacyMj: html.includes('mj-cart'),
      };

      const liveInfo = {
        classes: liveDrawer?.className || null,
        hasMisjoyas: liveDrawer?.classList.contains('misjoyas-cart') ?? false,
        hasProgress: !!liveDrawer?.querySelector('.misjoyas-cart-progress'),
      };

      console.log('Section API (cart-drawer)', sectionInfo);
      console.log('DOM live (#CartDrawer)', liveInfo);

      if (sectionInfo.sectionClasses !== liveInfo.classes) {
        console.warn('El HTML del section API no coincide con el drawer en pantalla — puede haber caché o un render distinto.');
      }
      if (sectionInfo.sectionHasMisjoyas && !liveInfo.hasMisjoyas) {
        console.warn('El section trae .misjoyas-cart pero el DOM live no — reLoad() podría no estar aplicando el HTML nuevo.');
      }

      console.groupEnd();
      return { sectionInfo, liveInfo, htmlSnippet: html.slice(0, 500) };
    } catch (error) {
      console.error('Error al fetch cart-drawer section', error);
      console.groupEnd();
      throw error;
    }
  };

  let wrapped = false;

  const watch = () => {
    if (wrapped) {
      console.info(`${LOG} watch ya activo`);
      return;
    }

    const wrapStore = () => {
      const store = getMiniCartStore();
      if (!store || store.__mjDebugWrapped) return !!store;

      ['openCart', 'hideCart', 'reLoad'].forEach((method) => {
        const original = store[method]?.bind(store);
        if (!original) return;

        store[method] = function (...args) {
          console.group(`${LOG} xMiniCart.${method}()`);
          run({ trigger: `xMiniCart.${method}` });
          console.groupEnd();
          return original(...args);
        };
      });

      store.__mjDebugWrapped = true;
      wrapped = true;
      console.info(`${LOG} watch activo — abre/cierra el carrito para ver logs`);
      return true;
    };

    document.addEventListener('alpine:init', wrapStore);
    if (!wrapStore()) {
      window.setTimeout(wrapStore, 500);
      window.setTimeout(wrapStore, 2000);
    }

    document.addEventListener('eurus:cart:items-changed', () => {
      console.info(`${LOG} evento eurus:cart:items-changed`);
      run({ trigger: 'eurus:cart:items-changed' });
    });
  };

  const unwatch = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    console.info(`${LOG} Para desactivar watch recarga sin ?mj_cart_debug=1`);
  };

  window.MisJoyasCartDebug = {
    run,
    watch,
    unwatch,
    fetchSection,
    enable: () => {
      try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) { /* ignore */ }
      watch();
      run({ trigger: 'enable' });
    },
  };

  console.info(
    `${LOG} Debugger listo. Comandos: MisJoyasCartDebug.run(), .watch(), .fetchSection(), .enable()`
  );

  if (isEnabled()) {
    watch();
    window.addEventListener('load', () => {
      run({ trigger: 'auto-load' });
    });
  }
})();

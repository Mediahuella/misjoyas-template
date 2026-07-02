/**
 * Debugger del cart drawer Mis Joyas (carga bajo demanda vía cart-debug.js).
 * Activar: ?mj_cart_debug=1 o localStorage misjoyas_cart_debug=1
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

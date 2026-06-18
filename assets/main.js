/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/main.js"
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
() {

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Sube el botón flotante de WhatsApp (app WhatsUp) por encima de la barra sticky
// de "agregar al carro" en mobile, para que no se interpongan. El botón vive dentro
// de un shadow DOM con `bottom: 16px` fijo, así que se controla via custom property
// (las CSS custom properties sí cruzan el shadow boundary).
(function () {
  if (window.__mjWaStickyOffset) return;
  window.__mjWaStickyOffset = true;
  var GAP = 12; // separación entre el botón y la barra
  var BASE_BOTTOM = 16; // bottom original del botón (app)
  var isMobile = function isMobile() {
    return window.matchMedia('(max-width: 767px)').matches;
  };
  var waEl = null;
  var styleInjected = false;
  function injectShadowStyle(el) {
    if (styleInjected || !el || !el.shadowRoot) return;
    var target = el.shadowRoot.querySelector('.whatsup-whatsapp-button');
    if (!target) return;
    var style = document.createElement('style');
    style.textContent = '.whatsup-whatsapp-button{bottom:var(--mj-wa-bottom,' + BASE_BOTTOM + 'px)!important;' + 'transition:bottom .3s cubic-bezier(0.075,0.82,0.165,1);}';
    el.shadowRoot.appendChild(style);
    styleInjected = true;
  }
  function update() {
    if (!waEl) return;
    var bar = document.querySelector('[id^="sticky-add-to-cart-"]');
    var bottom = BASE_BOTTOM;
    if (isMobile() && bar && getComputedStyle(bar).display !== 'none') {
      var h = bar.getBoundingClientRect().height;
      if (h > 0) bottom = Math.round(h + GAP);
    }
    waEl.style.setProperty('--mj-wa-bottom', bottom + 'px');
  }
  function start() {
    waEl = document.querySelector('whatsup-whatsapp-button');
    if (!waEl) return false;
    injectShadowStyle(waEl);
    if (!styleInjected) return false;
    var bar = document.querySelector('[id^="sticky-add-to-cart-"]');
    if (bar) {
      new MutationObserver(update).observe(bar, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }
    window.addEventListener('resize', update, {
      passive: true
    });
    window.addEventListener('scroll', update, {
      passive: true
    });
    update();
    return true;
  }

  // La app y el custom element cargan de forma diferida; reintentar hasta que existan.
  if (!start()) {
    var tries = 0;
    var timer = setInterval(function () {
      if (start() || ++tries > 60) clearInterval(timer);
    }, 500);
  }
})();
document.addEventListener('alpine:init', function () {
  Alpine.store('xSearchBar', {
    mobileOpen: false,
    toggle: function toggle() {
      this.mobileOpen = !this.mobileOpen;
    },
    close: function close() {
      this.mobileOpen = false;
    }
  });
  Alpine.data('xInlineSearch', function (type, maxResults) {
    return {
      query: '',
      result: '',
      cachedResults: {},
      openResults: false,
      loading: false,
      _t: null,
      keyUp: function keyUp() {
        var _this = this;
        clearTimeout(this._t);
        this._t = setTimeout(function () {
          var q = _this.query.trim();
          if (q) {
            _this.getSearchResult(q);
          } else {
            _this.result = '';
            _this.openResults = false;
          }
        }, 300);
      },
      focusForm: function focusForm() {
        if (this.query && this.result) this.openResults = true;
      },
      closeResults: function closeResults() {
        this.openResults = false;
      },
      getSearchResult: function getSearchResult(query) {
        var _this2 = this;
        var key = query.toLowerCase().replace(/\s+/g, '-') + '_' + maxResults;
        if (this.cachedResults[key]) {
          this.result = this.cachedResults[key];
          this.openResults = true;
          return;
        }
        this.loading = true;
        var field = 'author,body,product_type,tag,title,variants.barcode,variants.sku,variants.title,vendor';
        var url = "".concat(Shopify.routes.root, "search/suggest?q=").concat(encodeURIComponent(query), "&").concat(encodeURIComponent('resources[type]'), "=").concat(encodeURIComponent('product,collection'), "&").concat(encodeURIComponent('resources[options][fields]'), "=").concat(encodeURIComponent(field), "&").concat(encodeURIComponent('resources[limit]'), "=").concat(encodeURIComponent(maxResults), "&section_id=predictive-search");
        fetch(url).then(function (r) {
          return r.text();
        }).then(function (text) {
          var doc = new DOMParser().parseFromString(text, 'text/html');
          var el = doc.querySelector('#shopify-section-predictive-search');
          if (el) {
            _this2.result = el.innerHTML;
            _this2.cachedResults[key] = _this2.result;
            _this2.openResults = true;
          }
          _this2.loading = false;
        })["catch"](function () {
          _this2.loading = false;
        });
      }
    };
  });
  Alpine.data('xProductShare', function () {
    return {
      open: false,
      handleShare: function handleShare() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var root, title, url, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.p = _context.n) {
              case 0:
                root = _this3.$el;
                title = root.dataset.shareTitle || document.title;
                url = root.dataset.shareUrl || window.location.href;
                if (!navigator.share) {
                  _context.n = 4;
                  break;
                }
                _context.p = 1;
                _context.n = 2;
                return navigator.share({
                  title: title,
                  url: url
                });
              case 2:
                _this3.open = false;
                return _context.a(2);
              case 3:
                _context.p = 3;
                _t = _context.v;
                if (!((_t === null || _t === void 0 ? void 0 : _t.name) === 'AbortError')) {
                  _context.n = 4;
                  break;
                }
                return _context.a(2);
              case 4:
                _this3.open = !_this3.open;
              case 5:
                return _context.a(2);
            }
          }, _callee, null, [[1, 3]]);
        }))();
      }
    };
  });
  Alpine.data('xProductWishlist', function () {
    return {
      added: false,
      _observer: null,
      _initialized: false,
      _pollTimer: null,
      init: function init() {
        var _this4 = this;
        this.$nextTick(function () {
          return _this4.bootstrap();
        });
        document.addEventListener('wishlist-hero-wishlist-sdk-ready', function () {
          return _this4.bootstrap();
        });
        window.addEventListener('wishlist-hero-wishlist-sdk-ready', function () {
          return _this4.bootstrap();
        });
        this._pollTimer = window.setInterval(function () {
          _this4.bootstrap();
        }, 300);
        window.setTimeout(function () {
          window.clearInterval(_this4._pollTimer);
        }, 20000);
        this.watchStrayWishlist();
        this.watchVariantChange();
      },
      bootstrap: function bootstrap() {
        var mounted = this.claimAutoButton() || this.initWithSdk() || this.initWithCustomEvent();
        this.purgeStrayWishlist();
        return mounted;
      },
      isInsideWishlistSlot: function isInsideWishlistSlot(node) {
        var _node$closest;
        return !!(node !== null && node !== void 0 && (_node$closest = node.closest) !== null && _node$closest !== void 0 && _node$closest.call(node, '.misjoyas-product-wishlist__slot'));
      },
      isStrayWishlistNode: function isStrayWishlistNode(node) {
        var _node$tagName, _node$classList, _node$classList2, _node$classList3, _node$getAttribute;
        if (!node || node.nodeType !== 1 || this.isInsideWishlistSlot(node)) return false;
        var tag = (_node$tagName = node.tagName) === null || _node$tagName === void 0 ? void 0 : _node$tagName.toLowerCase();
        if (tag === 'wishlist-button-block') return true;
        if ((_node$classList = node.classList) !== null && _node$classList !== void 0 && _node$classList.contains('wishlist-hero-custom-button') && !node.classList.contains('misjoyas-wishlist-hero-engine')) {
          return true;
        }
        if ((_node$classList2 = node.classList) !== null && _node$classList2 !== void 0 && _node$classList2.contains('wishlist-engine-button') || (_node$classList3 = node.classList) !== null && _node$classList3 !== void 0 && _node$classList3.contains('wishlist-page-widget')) {
          return true;
        }
        var label = "".concat(((_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, 'aria-label')) || '', " ").concat(node.textContent || '');
        return /wishlist|deseados|lista de deseados|añadir a favoritos|agregar a la lista|add to wishlist/i.test(label);
      },
      purgeStrayWishlist: function purgeStrayWishlist() {
        var _this5 = this;
        var productInfo = document.querySelector('.section-product-info .product-info');
        if (!productInfo) return;
        var seen = new Set();
        productInfo.querySelectorAll('wishlist-button-block, .shopify-block.shopify-app-block, .wishlist-hero-custom-button, button, [role="button"]').forEach(function (node) {
          if (!_this5.isStrayWishlistNode(node)) return;
          var block = node.closest('.shopify-block.shopify-app-block') || node.closest('wishlist-button-block') || node;
          if (_this5.isInsideWishlistSlot(block) || seen.has(block)) return;
          seen.add(block);
          block.setAttribute('aria-hidden', 'true');
          block.style.display = 'none';
        });
      },
      watchStrayWishlist: function watchStrayWishlist() {
        var _this6 = this;
        var productInfo = document.querySelector('.section-product-info .product-info');
        if (!productInfo) return;
        new MutationObserver(function () {
          return _this6.purgeStrayWishlist();
        }).observe(productInfo, {
          childList: true,
          subtree: true
        });
      },
      claimAutoButton: function claimAutoButton() {
        var _this7 = this;
        var slot = this.$refs.slot;
        if (!slot || slot.children.length) return (slot === null || slot === void 0 ? void 0 : slot.children.length) > 0;
        var productInfo = document.querySelector('.section-product-info .product-info');
        if (!productInfo) return false;
        var wlhNode = _toConsumableArray(productInfo.querySelectorAll('wishlist-button-block')).find(function (node) {
          return !_this7.$el.contains(node);
        });
        if (wlhNode) {
          var mountTarget = wlhNode.closest('.shopify-block.shopify-app-block') || wlhNode;
          mountTarget.classList.add('misjoyas-wishlist-mounted');
          slot.appendChild(mountTarget);
          this.attachStateObserver(mountTarget);
          this._initialized = true;
          this.purgeStrayWishlist();
          return true;
        }
        var appBlock = _toConsumableArray(productInfo.querySelectorAll('.shopify-block.shopify-app-block')).find(function (node) {
          return !_this7.$el.contains(node) && (node.querySelector('[class*="wishlist"]') || /wishlist|deseados|lista de deseados/i.test(node.textContent || ''));
        });
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
      initWithSdk: function initWithSdk() {
        var _window$WishListHero_;
        if (this._initialized || !((_window$WishListHero_ = window.WishListHero_SDK) !== null && _window$WishListHero_ !== void 0 && _window$WishListHero_.InitializeAddToWishListButton)) {
          return false;
        }
        var root = this.$el;
        var engine = this.$refs.engine;
        if (!engine || engine.dataset.wlhReady === 'true') return (engine === null || engine === void 0 ? void 0 : engine.dataset.wlhReady) === 'true';
        try {
          var _this$$refs$slot;
          window.WishListHero_SDK.InitializeAddToWishListButton({
            ButtonClassElement: 'misjoyas-wishlist-hero-engine',
            ProductId: Number(root.dataset.wlhProductId),
            ProductLink: root.dataset.wlhLink,
            ProductVariantId: Number(root.dataset.wlhVariantId),
            ProductPrice: Number(root.dataset.wlhPrice),
            ProductTitle: root.dataset.wlhName,
            ProductImage: root.dataset.wlhImage,
            ButtonMode: 'icon_only'
          });
          engine.dataset.wlhReady = 'true';
          engine.hidden = false;
          engine.classList.add('misjoyas-wishlist-mounted');
          (_this$$refs$slot = this.$refs.slot) === null || _this$$refs$slot === void 0 || _this$$refs$slot.appendChild(engine);
          this.attachStateObserver(engine);
          this._initialized = true;
          return true;
        } catch (error) {
          return false;
        }
      },
      initWithCustomEvent: function initWithCustomEvent() {
        var _this8 = this;
        var engine = this.$refs.engine;
        if (!engine || engine.dataset.wlhReady === 'true') return (engine === null || engine === void 0 ? void 0 : engine.dataset.wlhReady) === 'true';
        document.dispatchEvent(new CustomEvent('wishlist-hero-add-to-custom-element', {
          detail: engine
        }));
        window.setTimeout(function () {
          var hasButton = engine.querySelector('button, [role="button"], wishlist-button-block');
          if (hasButton) {
            var _this8$$refs$slot;
            engine.dataset.wlhReady = 'true';
            engine.hidden = false;
            engine.classList.add('misjoyas-wishlist-mounted');
            (_this8$$refs$slot = _this8.$refs.slot) === null || _this8$$refs$slot === void 0 || _this8$$refs$slot.appendChild(engine);
            _this8.attachStateObserver(engine);
            _this8._initialized = true;
          }
        }, 500);
        return engine.dataset.wlhReady === 'true';
      },
      attachStateObserver: function attachStateObserver(target) {
        var _this$_observer,
          _this9 = this;
        (_this$_observer = this._observer) === null || _this$_observer === void 0 || _this$_observer.disconnect();
        this._observer = new MutationObserver(function () {
          return _this9.syncAddedState(target);
        });
        this._observer.observe(target, {
          attributes: true,
          childList: true,
          subtree: true,
          attributeFilter: ['class', 'aria-pressed', 'aria-checked', 'data-added', 'added']
        });
        target.addEventListener('click', function () {
          window.setTimeout(function () {
            return _this9.syncAddedState(target);
          }, 150);
          window.setTimeout(function () {
            return _this9.syncAddedState(target);
          }, 600);
        }, true);
        this.syncAddedState(target);
      },
      syncAddedState: function syncAddedState(target) {
        var scope = target || this.$refs.slot || this.$el;
        var btn = scope.querySelector('button, [role="button"]');
        var block = scope.querySelector('wishlist-button-block') || scope.closest('wishlist-button-block');
        var label = (btn === null || btn === void 0 ? void 0 : btn.getAttribute('aria-label')) || (btn === null || btn === void 0 ? void 0 : btn.textContent) || '';
        this.added = (btn === null || btn === void 0 ? void 0 : btn.getAttribute('aria-pressed')) === 'true' || (btn === null || btn === void 0 ? void 0 : btn.getAttribute('aria-checked')) === 'true' || (block === null || block === void 0 ? void 0 : block.getAttribute('aria-checked')) === 'true' || (block === null || block === void 0 ? void 0 : block.getAttribute('data-added')) === 'true' || (block === null || block === void 0 ? void 0 : block.hasAttribute('added')) || (btn === null || btn === void 0 ? void 0 : btn.classList.contains('wlh-added')) || (btn === null || btn === void 0 ? void 0 : btn.classList.contains('added')) || (btn === null || btn === void 0 ? void 0 : btn.classList.contains('active')) || scope.querySelector('.wlh-icon-heart-full, .wlh-svg-icon-heart-full, [class*="heart-full"], [class*="heart-filled"]') !== null || /remove|quitar|eliminar|remov/i.test(label);
      },
      watchVariantChange: function watchVariantChange() {
        var _this0 = this;
        var form = document.querySelector('.product-form, form[action*="/cart/add"]');
        var idInput = form === null || form === void 0 ? void 0 : form.querySelector('input[name="id"]');
        if (!idInput) return;
        idInput.addEventListener('change', function () {
          return _this0.updateVariant(idInput.value);
        });
        document.addEventListener('variant:change', function (event) {
          var _event$detail;
          var variantId = (_event$detail = event.detail) === null || _event$detail === void 0 || (_event$detail = _event$detail.variant) === null || _event$detail === void 0 ? void 0 : _event$detail.id;
          if (variantId) _this0.updateVariant(variantId);
        });
      },
      updateVariant: function updateVariant(variantId) {
        var _window$WishListHero_2;
        if (!variantId) return;
        var root = this.$el;
        root.dataset.wlhVariantId = variantId;
        var engine = this.$refs.engine;
        if (engine) {
          engine.setAttribute('data-wlh-variantid', variantId);
        }
        if ((_window$WishListHero_2 = window.WishListHero_SDK) !== null && _window$WishListHero_2 !== void 0 && _window$WishListHero_2.InitializeAddToWishListButton) {
          this._initialized = false;
          if (engine) engine.dataset.wlhReady = 'false';
          this.initWithSdk();
        }
      },
      destroy: function destroy() {
        var _this$_observer2;
        (_this$_observer2 = this._observer) === null || _this$_observer2 === void 0 || _this$_observer2.disconnect();
        window.clearInterval(this._pollTimer);
      }
    };
  });
});

/**
 * Flechas custom para featured-collection-misjoyas (Splide arrows: false).
 */
window.bindFeaturedCollectionMjArrows = function (root, desktopMove, mobileMove) {
  if (!(root !== null && root !== void 0 && root.splide)) return;
  var prev = root.querySelector('[data-fc-mj-arrow="prev"]') || root.querySelector('.splide__arrow--prev');
  var next = root.querySelector('[data-fc-mj-arrow="next"]') || root.querySelector('.splide__arrow--next');
  var getMove = function getMove() {
    return window.innerWidth >= 768 ? desktopMove : mobileMove;
  };
  var updateDisabled = function updateDisabled() {
    var end = root.splide.Components.Controller.getEnd();
    var index = root.splide.index;
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
    prev.addEventListener('click', function (event) {
      if (window.innerWidth < 768) return;
      event.preventDefault();
      event.stopPropagation();
      root.splide.go('-' + getMove());
    });
  }
  if (next && !next.dataset.fcMjBound) {
    next.dataset.fcMjBound = '1';
    next.addEventListener('click', function (event) {
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
  var LOG = '[MisJoyas Cart Debug]';
  var STORAGE_KEY = 'misjoyas_cart_debug';
  var isEnabled = function isEnabled() {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return true;
    } catch (e) {/* ignore */}
    return new URLSearchParams(window.location.search).has('mj_cart_debug');
  };
  var getDrawer = function getDrawer() {
    return document.getElementById('CartDrawer');
  };
  var getMiniCartStore = function getMiniCartStore() {
    var _window$Alpine, _window$Alpine$store;
    return ((_window$Alpine = window.Alpine) === null || _window$Alpine === void 0 || (_window$Alpine$store = _window$Alpine.store) === null || _window$Alpine$store === void 0 ? void 0 : _window$Alpine$store.call(_window$Alpine, 'xMiniCart')) || null;
  };
  var getCartBubbleCount = function getCartBubbleCount() {
    var bubble = document.querySelector('#cart-icon-bubble [aria-hidden="true"]') || document.querySelector('#cart-icon-bubble span');
    return parseInt((bubble === null || bubble === void 0 ? void 0 : bubble.textContent) || '0', 10) || 0;
  };
  var scanStylesheets = function scanStylesheets() {
    var mainCssLinks = _toConsumableArray(document.querySelectorAll('link[rel="stylesheet"]')).filter(function (link) {
      return /main\.css/i.test(link.href);
    }).map(function (link) {
      return {
        href: link.href,
        loaded: !!link.sheet
      };
    });
    var misjoyasSelectors = [];
    var blockedSheets = [];
    var _iterator = _createForOfIteratorHelper(document.styleSheets),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var sheet = _step.value;
        var rules = void 0;
        try {
          rules = sheet.cssRules;
        } catch (error) {
          blockedSheets.push({
            href: sheet.href || '(inline)',
            reason: error.message
          });
          continue;
        }
        var _iterator2 = _createForOfIteratorHelper(rules || []),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var rule = _step2.value;
            var selector = rule.selectorText || '';
            if (selector.includes('misjoyas-cart')) {
              misjoyasSelectors.push({
                href: sheet.href || '(inline)',
                selector: selector
              });
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return {
      mainCssLinks: mainCssLinks,
      misjoyasRuleCount: misjoyasSelectors.length,
      misjoyasSample: misjoyasSelectors.slice(0, 5),
      blockedSheets: blockedSheets
    };
  };
  var inspectStyles = function inspectStyles(drawer) {
    if (!drawer) return null;
    var panel = drawer.querySelector('#update-cart, .misjoyas-cart__panel');
    var title = drawer.querySelector('.misjoyas-cart__title');
    var progress = drawer.querySelector('.misjoyas-cart-progress');
    var read = function read(el) {
      if (!el) return null;
      var style = getComputedStyle(el);
      return {
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        maxWidth: style.maxWidth,
        width: style.width,
        zIndex: style.zIndex,
        fontSize: style.fontSize,
        color: style.color
      };
    };
    return {
      drawer: read(drawer),
      panel: read(panel),
      title: read(title),
      progress: read(progress)
    };
  };
  var inspectAlpine = function inspectAlpine(drawer) {
    var _window$Alpine2, _drawer$hasAttribute;
    var miniCart = getMiniCartStore();
    var alpineData = drawer && ((_window$Alpine2 = window.Alpine) === null || _window$Alpine2 === void 0 || (_window$Alpine2 = _window$Alpine2._x_dataStack) === null || _window$Alpine2 === void 0 ? void 0 : _window$Alpine2[0]);
    return {
      alpineLoaded: !!window.Alpine,
      miniCart: miniCart ? {
        open: miniCart.open,
        loading: miniCart.loading,
        type: miniCart.type,
        needReload: miniCart.needReload
      } : null,
      drawerXData: alpineData ? Object.keys(alpineData) : null,
      xCloakPresent: (_drawer$hasAttribute = drawer === null || drawer === void 0 ? void 0 : drawer.hasAttribute('x-cloak')) !== null && _drawer$hasAttribute !== void 0 ? _drawer$hasAttribute : false
    };
  };
  var inspectDom = function inspectDom() {
    var _drawer$classList$con, _drawer$className$inc, _drawer$innerHTML;
    var drawers = _toConsumableArray(document.querySelectorAll('#CartDrawer'));
    var drawer = drawers[0] || null;
    return {
      drawerCount: drawers.length,
      drawerPresent: !!drawer,
      classes: (drawer === null || drawer === void 0 ? void 0 : drawer.className) || null,
      hasMisjoyasRootClass: (_drawer$classList$con = drawer === null || drawer === void 0 ? void 0 : drawer.classList.contains('misjoyas-cart')) !== null && _drawer$classList$con !== void 0 ? _drawer$classList$con : false,
      hasLegacyMjClass: (_drawer$className$inc = drawer === null || drawer === void 0 ? void 0 : drawer.className.includes('mj-cart')) !== null && _drawer$className$inc !== void 0 ? _drawer$className$inc : false,
      progressPresent: !!(drawer !== null && drawer !== void 0 && drawer.querySelector('.misjoyas-cart-progress')),
      progressLegacyMj: !!(drawer !== null && drawer !== void 0 && drawer.querySelector('.mj-cart__progress')),
      panelPresent: !!(drawer !== null && drawer !== void 0 && drawer.querySelector('.misjoyas-cart__panel, #update-cart')),
      renderedIn: drawer !== null && drawer !== void 0 && drawer.closest('#ajax-loading-cart') ? 'section cart-drawer (#ajax-loading-cart)' : drawer ? 'snippet directo (theme.liquid)' : null,
      innerHTMLLength: (drawer === null || drawer === void 0 || (_drawer$innerHTML = drawer.innerHTML) === null || _drawer$innerHTML === void 0 ? void 0 : _drawer$innerHTML.length) || 0
    };
  };
  var inspectOpenLogic = function inspectOpenLogic() {
    var drawer = getDrawer();
    var itemCount = getCartBubbleCount();
    var hasProgress = !!(drawer !== null && drawer !== void 0 && drawer.querySelector('.misjoyas-cart-progress'));
    var miniCart = getMiniCartStore();
    return {
      itemCount: itemCount,
      hasProgress: hasProgress,
      wouldForceReloadOnOpen: itemCount > 0 && !hasProgress,
      reloadBlockedByLoading: !!(miniCart !== null && miniCart !== void 0 && miniCart.loading),
      onCartPage: window.location.pathname === '/cart',
      cartTypeSettingGuess: drawer !== null && drawer !== void 0 && drawer.classList.contains('drawer') ? 'drawer' : drawer !== null && drawer !== void 0 && drawer.classList.contains('popup') ? 'popup' : null
    };
  };
  var summarizeIssues = function summarizeIssues(report) {
    var _report$computed, _report$alpine$miniCa, _report$computed2;
    var issues = [];
    if (!report.dom.drawerPresent) {
      issues.push('No existe #CartDrawer en el DOM.');
    }
    if (report.dom.drawerCount > 1) {
      issues.push("Hay ".concat(report.dom.drawerCount, " elementos #CartDrawer (IDs duplicados)."));
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
    if (report.dom.drawerPresent && ((_report$computed = report.computed) === null || _report$computed === void 0 || (_report$computed = _report$computed.drawer) === null || _report$computed === void 0 ? void 0 : _report$computed.display) === 'none' && (_report$alpine$miniCa = report.alpine.miniCart) !== null && _report$alpine$miniCa !== void 0 && _report$alpine$miniCa.open) {
      issues.push('El store dice open=true pero #CartDrawer tiene display:none.');
    }
    if (report.dom.drawerPresent && ((_report$computed2 = report.computed) === null || _report$computed2 === void 0 || (_report$computed2 = _report$computed2.panel) === null || _report$computed2 === void 0 ? void 0 : _report$computed2.maxWidth) === '384px') {
      issues.push('Panel sigue con max-width ~384px (md:w-96 del tema base) — CSS Mis Joyas no está ganando.');
    }
    return issues;
  };
  var run = function run() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var drawer = getDrawer();
    var report = {
      at: new Date().toISOString(),
      trigger: context.trigger || 'manual',
      url: window.location.href,
      dom: inspectDom(),
      alpine: inspectAlpine(drawer),
      openLogic: inspectOpenLogic(),
      stylesheets: scanStylesheets(),
      computed: inspectStyles(drawer)
    };
    report.issues = summarizeIssues(report);
    console.group("".concat(LOG, " ").concat(report.trigger));
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
  var fetchSection = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var _sectionDrawer$classL, _liveDrawer$classList, response, json, html, doc, sectionDrawer, liveDrawer, sectionInfo, liveInfo, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            console.group("".concat(LOG, " fetchSection()"));
            _context2.p = 1;
            _context2.n = 2;
            return fetch("".concat(window.location.pathname, "?sections=cart-drawer"));
          case 2:
            response = _context2.v;
            _context2.n = 3;
            return response.json();
          case 3:
            json = _context2.v;
            html = json['cart-drawer'] || '';
            doc = new DOMParser().parseFromString(html, 'text/html');
            sectionDrawer = doc.querySelector('#CartDrawer');
            liveDrawer = getDrawer();
            sectionInfo = {
              htmlLength: html.length,
              hasCartDrawer: !!sectionDrawer,
              sectionClasses: (sectionDrawer === null || sectionDrawer === void 0 ? void 0 : sectionDrawer.className) || null,
              sectionHasMisjoyas: (_sectionDrawer$classL = sectionDrawer === null || sectionDrawer === void 0 ? void 0 : sectionDrawer.classList.contains('misjoyas-cart')) !== null && _sectionDrawer$classL !== void 0 ? _sectionDrawer$classL : false,
              sectionHasProgress: html.includes('misjoyas-cart-progress'),
              sectionHasLegacyMj: html.includes('mj-cart')
            };
            liveInfo = {
              classes: (liveDrawer === null || liveDrawer === void 0 ? void 0 : liveDrawer.className) || null,
              hasMisjoyas: (_liveDrawer$classList = liveDrawer === null || liveDrawer === void 0 ? void 0 : liveDrawer.classList.contains('misjoyas-cart')) !== null && _liveDrawer$classList !== void 0 ? _liveDrawer$classList : false,
              hasProgress: !!(liveDrawer !== null && liveDrawer !== void 0 && liveDrawer.querySelector('.misjoyas-cart-progress'))
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
            return _context2.a(2, {
              sectionInfo: sectionInfo,
              liveInfo: liveInfo,
              htmlSnippet: html.slice(0, 500)
            });
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            console.error('Error al fetch cart-drawer section', _t2);
            console.groupEnd();
            throw _t2;
          case 5:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 4]]);
    }));
    return function fetchSection() {
      return _ref.apply(this, arguments);
    };
  }();
  var wrapped = false;
  var watch = function watch() {
    if (wrapped) {
      console.info("".concat(LOG, " watch ya activo"));
      return;
    }
    var wrapStore = function wrapStore() {
      var store = getMiniCartStore();
      if (!store || store.__mjDebugWrapped) return !!store;
      ['openCart', 'hideCart', 'reLoad'].forEach(function (method) {
        var _store$method;
        var original = (_store$method = store[method]) === null || _store$method === void 0 ? void 0 : _store$method.bind(store);
        if (!original) return;
        store[method] = function () {
          console.group("".concat(LOG, " xMiniCart.").concat(method, "()"));
          run({
            trigger: "xMiniCart.".concat(method)
          });
          console.groupEnd();
          return original.apply(void 0, arguments);
        };
      });
      store.__mjDebugWrapped = true;
      wrapped = true;
      console.info("".concat(LOG, " watch activo \u2014 abre/cierra el carrito para ver logs"));
      return true;
    };
    document.addEventListener('alpine:init', wrapStore);
    if (!wrapStore()) {
      window.setTimeout(wrapStore, 500);
      window.setTimeout(wrapStore, 2000);
    }
    document.addEventListener('eurus:cart:items-changed', function () {
      console.info("".concat(LOG, " evento eurus:cart:items-changed"));
      run({
        trigger: 'eurus:cart:items-changed'
      });
    });
  };
  var unwatch = function unwatch() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {/* ignore */}
    console.info("".concat(LOG, " Para desactivar watch recarga sin ?mj_cart_debug=1"));
  };
  window.MisJoyasCartDebug = {
    run: run,
    watch: watch,
    unwatch: unwatch,
    fetchSection: fetchSection,
    enable: function enable() {
      try {
        localStorage.setItem(STORAGE_KEY, '1');
      } catch (e) {/* ignore */}
      watch();
      run({
        trigger: 'enable'
      });
    }
  };
  console.info("".concat(LOG, " Debugger listo. Comandos: MisJoyasCartDebug.run(), .watch(), .fetchSection(), .enable()"));
  if (isEnabled()) {
    watch();
    window.addEventListener('load', function () {
      run({
        trigger: 'auto-load'
      });
    });
  }
})();

/***/ },

/***/ "./src/css/main.css"
/*!**************************!*\
  !*** ./src/css/main.css ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/assets/main": 0,
/******/ 			"assets/main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmisjoyas_template"] = self["webpackChunkmisjoyas_template"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["assets/main"], () => (__webpack_require__("./src/js/main.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["assets/main"], () => (__webpack_require__("./src/css/main.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
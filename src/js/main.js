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
});

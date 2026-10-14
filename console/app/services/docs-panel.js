import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DocsPanelService extends Service {
    @service fetch;
    @service intl;

    @tracked isOpen = false;
    @tracked isLoading = false;
    @tracked title = 'Documentación';
    @tracked currentSlug = 'index';
    @tracked currentLang = 'es';
    @tracked renderedHtml = '';
    @tracked rawMarkdown = '';
    @tracked error = null;
    @tracked isExpanded = false;

    get canEmbed() {
        return true;
    }

    get isIframeThemeDark() {
        return false;
    }

    get bodyWrapperClass() {
        return 'fleetbase-docs-panel-body';
    }

    get panelWidth() {
        return this.isExpanded ? '720px' : '480px';
    }

    /**
     * Open the native documentation panel for a given slug or legacy URL.
     *
     * @param {string} slugOrUrl
     * @param {object} options
     */
    @action
    open(slugOrUrl, options = {}) {
        // Detect initial language based on intl primary locale
        const locale = this.intl?.primaryLocale || 'es-mx';
        const defaultLang = locale.toLowerCase().startsWith('es') ? 'es' : 'en';

        this.currentLang = options.lang || this.currentLang || defaultLang;
        this.currentSlug = this.normalizeSlug(slugOrUrl);
        this.title = options.title || 'Documentación';
        this.isOpen = true;

        this.loadDoc(this.currentSlug, this.currentLang);
    }

    /**
     * Close the documentation panel.
     */
    @action
    close() {
        this.isOpen = false;
        this.isLoading = false;
    }

    /**
     * Toggle panel width between standard and expanded.
     */
    @action
    toggleExpand() {
        this.isExpanded = !this.isExpanded;
    }

    /**
     * Toggle language between Spanish and English.
     */
    @action
    toggleLang() {
        const nextLang = this.currentLang === 'es' ? 'en' : 'es';
        this.loadDoc(this.currentSlug, nextLang);
    }

    /**
     * Load documentation content from the internal API endpoint.
     *
     * @param {string} slug
     * @param {string} lang
     */
    @action
    async loadDoc(slug, lang) {
        this.isLoading = true;
        this.error = null;
        this.currentSlug = slug || 'index';
        this.currentLang = lang || 'es';

        try {
            // First attempt via Ember FetchService (injects auth and base URL)
            let result = null;
            if (this.fetch && typeof this.fetch.get === 'function') {
                try {
                    result = await this.fetch.get(`docs/${encodeURIComponent(this.currentSlug)}`, { lang: this.currentLang });
                } catch (e) {
                    result = null;
                }
            }

            // Fallback to window.fetch if FetchService fails or doesn't resolve
            if (!result || !result.data) {
                const apiHost = this.fetch?.host || window.location.origin;
                const apiNamespace = this.fetch?.namespace || 'int/v1';
                const directUrl = `${apiHost}/${apiNamespace}/docs/${this.currentSlug}?lang=${this.currentLang}`;
                const resp = await window.fetch(directUrl);
                if (resp.ok) {
                    result = await resp.json();
                }
            }

            if (result && result.data) {
                this.title = result.data.title || this.title || 'Documentación';
                this.currentLang = result.data.lang || this.currentLang;
                this.rawMarkdown = result.data.content || '';
                this.renderedHtml = result.data.html || '';
            } else {
                throw new Error('Documento no encontrado o respuesta vacía.');
            }
        } catch (err) {
            console.error('DocsPanelService error loading doc:', err);
            this.error = 'No se pudo cargar la documentación para este elemento.';
            this.renderedHtml = '';
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Normalize a slug or URL to a clean relative path.
     *
     * @param {string} input
     * @returns {string}
     */
    normalizeSlug(input) {
        if (!input) return 'index';
        let s = String(input).trim();
        // Remove protocol and domain if present
        s = s.replace(/^https?:\/\/[^\/]+\/(?:docs\/?)?/i, '');
        // Remove leading /docs/ or docs/
        s = s.replace(/^\/?docs\/?/i, '');
        // Remove query parameters or hash
        s = s.split('?')[0].split('#')[0];
        // Trim slashes
        s = s.replace(/^\/+|\/+$/g, '');
        return s || 'index';
    }

    // Legacy no-op handlers for backwards compatibility
    @action markIframeFailed() {}
    @action markIframeLoaded() {}
    @action openExternal() {}
}

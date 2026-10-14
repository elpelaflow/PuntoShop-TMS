import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

export default class DocsPanelComponent extends Component {
    @service docsPanel;

    get renderedHtml() {
        return htmlSafe(this.docsPanel.renderedHtml || '');
    }

    get langBadgeText() {
        return (this.docsPanel.currentLang || 'es').toUpperCase();
    }

    get langToggleHelpText() {
        return this.docsPanel.currentLang === 'es' ? 'Ver en inglés' : 'Ver en español';
    }

    @action
    close() {
        this.docsPanel.close();
    }

    @action
    toggleLang() {
        this.docsPanel.toggleLang();
    }

    @action
    toggleExpand() {
        this.docsPanel.toggleExpand();
    }

    @action
    retry() {
        this.docsPanel.loadDoc(this.docsPanel.currentSlug, this.docsPanel.currentLang);
    }

    @action
    handleContentClick(event) {
        const link = event.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href) return;

        // Anchor link within current document
        if (href.startsWith('#')) {
            const id = href.slice(1);
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                event.preventDefault();
            }
            return;
        }

        // Ignore mailto / tel links
        if (/^(mailto|tel):/i.test(href)) {
            return;
        }

        // Intercept any fleetbase.io/docs URLs and route locally
        const fleetbaseDocsMatch = href.match(/^https?:\/\/(?:www\.)?fleetbase\.io\/docs(?:\/(.*))?$/i);
        if (fleetbaseDocsMatch) {
            event.preventDefault();
            const rawSlug = fleetbaseDocsMatch[1] || 'index';
            this.docsPanel.open(rawSlug);
            return;
        }

        // Intercept relative / internal doc paths (/docs/..., docs/..., or relative .md)
        const isInternalDoc =
            href.startsWith('/docs') ||
            href.startsWith('docs/') ||
            !/^https?:\/\//i.test(href);

        if (isInternalDoc) {
            event.preventDefault();
            this.docsPanel.open(href);
            return;
        }

        // Truly external link: open in new tab
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
}

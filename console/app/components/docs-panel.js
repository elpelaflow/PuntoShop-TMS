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

        // External link
        if (/^https?:\/\//i.test(href)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            return;
        }

        // Anchor link within the document
        if (href.startsWith('#')) {
            const id = href.slice(1);
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                event.preventDefault();
            }
            return;
        }

        // Internal docs link: load in panel
        event.preventDefault();
        this.docsPanel.open(href);
    }
}

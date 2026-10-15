import { warn } from '@ember/debug';

/**
 * Custom ember-intl missing message handler for PuntoShop TMS console.
 * Prevents raw 'Missing translation [...]' error strings from breaking user-facing UI.
 *
 * @param {string} key
 * @param {Array<string>} locales
 * @param {Object} options
 * @return {string}
 */
export default function missingMessage(key, locales, options = {}) {
    const localeNames = Array.isArray(locales) ? locales.join(', ') : locales || 'unknown';

    warn(`[ember-intl] translation: "${key}" on locale: "${localeNames}" was not found.`, false, {
        id: 'ember-intl-missing-translation',
    });

    if (!key || typeof key !== 'string') {
        return '';
    }

    // If the key has spaces, it was passed as a literal fallback string in template/JS
    if (key.includes(' ')) {
        return key;
    }

    // Otherwise, cleanly humanize the leaf key segment
    const leaf = key.split('.').pop();
    if (!leaf) {
        return key;
    }

    const humanized = leaf.replace(/[-_]+/g, ' ').trim();
    if (!humanized) {
        return key;
    }

    return humanized.charAt(0).toUpperCase() + humanized.slice(1);
}

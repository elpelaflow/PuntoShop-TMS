import LanguageService from '@fleetbase/ember-core/services/language';

export default class CustomLanguageService extends LanguageService {
    /**
     * Whitelist of permitted locales for PuntoShop TMS.
     *
     * @type {Array<string>}
     */
    allowedLocales = ['es-mx', 'en-us', 'pt-br', 'fr-fr', 'it-it', 'zh-cn'];

    /**
     * Filter available locales to only include whitelisted locales.
     *
     * @returns {Object}
     */
    _createAvailableLocaleMap() {
        const localeMap = super._createAvailableLocaleMap();
        const filteredMap = {};

        for (const key in localeMap) {
            if (this.allowedLocales.includes(key.toLowerCase())) {
                filteredMap[key] = localeMap[key];
            }
        }

        return filteredMap;
    }
}

/**
 * Provides localization of native strings for this component.
 */
const DICTIONARY = {
    en: {
        all: 'All',
        selected: 'Selected'
    },
    fr: {
        all: 'Tous les',
        selected: 'Sélectionné'
    }
};

/**
 * Controls dictionary functions to the localized string values.
 * This service will default the `en` value if `locale` instance isn't
 * found
 * Will also return the `key` value, if neither `locale` or `en` values aren't
 * found.
 * 
 * @function dictionary
 * @param {string} key - The key value to the string resource to be retrieved.
 * @returns {string} The localized string of found, otherwise the `key` param
 * is returned
 */
const dictionary = (key, locale) => {
    const baseLocale = locale || 'en';
    let value = DICTIONARY[baseLocale][key];
    value = value || DICTIONARY.en[key];
    return value || key;
};

export default dictionary;

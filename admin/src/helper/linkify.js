const URL_REGEX = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
const ANCHOR_OPENING_TAG = /<a\b[^>]*>/gi;
const ANCHOR_CLOSEING_TAG = /<\/a>/gi;

/**
 * Take a string and add anchor tag to the links inside string
 * @param {string} text
 * @returns {string}
 */
export const linkify = (text) => {
    return text.replace(URL_REGEX, function (url) {
        return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + "</a>";
    });
};

/**
 * Take a string and remove anchor tag inside string
 * @param {string} text
 * @returns {string}
 */
export const unLinkify = (text) => {
    return text.replace(ANCHOR_OPENING_TAG, "").replace(ANCHOR_CLOSEING_TAG, "");
};

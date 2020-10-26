/**
 * Given a url the method will return the url of an image
 * @param {String} url - Url of the imge
 * @returns {String}
 */
export function getImageUrl(url) {
    const images = require.context('../assets/', false, /\.png$/);
    return images(`./${url}`);
}
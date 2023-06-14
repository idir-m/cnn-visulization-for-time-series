/**
 * @module variables
 */



/**
 * Sélectionne l'élément HTML avec la classe "chart".
 * @type {HTMLElement}
 */
const chart = document.querySelector('.chart')


/**
 * Largeur de l'élément chart.
 * @type {number}
 */
const width = chart.offsetWidth;


/**
 * Hauteur de l'élément chart.
 * @type {number}
 */
const height = chart.offsetHeight;



const rectHeight = 44;
const rectWidth = 44;


const modalWidth = 1050;
const modalHeight = 400;


/**
 * Taille de l'élément SVG.
 * @type {{width: number, height: number}}
 */
const svgSize = { width: width, height: height };

/**
 * Taille des rectangles.
 * @type {{width: number, height: number}}
 */
const rectSize = { width: rectWidth, height: rectHeight };


/**
 * Taille du modal.
 * @type {{width: number, height: number}}
 */
const modalSize = { width: modalWidth, height: modalHeight };

export { svgSize, rectSize, modalSize };
const chart = document.querySelector('.chart')

const width = chart.offsetWidth;
const height = chart.offsetHeight;

const rectHeight = 44;
const rectWidth = 44;

const modalWidth = 1050;
const modalHeight = 400;


const svgSize = { width: width, height: height };
const rectSize = { width: rectWidth, height: rectHeight };
const modalSize = { width: modalWidth, height: modalHeight };

export { svgSize, rectSize, modalSize };
import './cnn.css'
import {
    select
} from 'd3'

import { svgSize } from './global-variables/variables';

import drawCnn from './draw-utils/cnnStructure.js'
import drawAllCharts from './draw-utils/chart/draw-all-charts.js'
import drawLinks from './draw-utils/links/draw-links';

const svg = select('.chart')
    .append('svg')
    .attr('width', svgSize.width)
    .attr('height', svgSize.height);


/**
 * Dessine la structure globale du réseau de neurones convolutif (CNN) dans la sélection SVG.
 * @see {@link module:cnnStructure} pour le code détaillé de cette fonction.
 * @function drawCnn
 * @param {d3.Selection} svg - La sélection SVG où le CNN doit être dessiné.
 */
drawCnn(svg)

/**
 * Dessine tous les graphiques pour chaque couche du CNN dans la sélection SVG.
 * @see {@link module:draw-all-charts} pour le code détaillé de cette fonction.
 * @function drawAllCharts
 * @param {d3.Selection} svg - La sélection SVG où les graphiques doivent être dessinés.
 */

drawAllCharts(svg)

/**
 * Dessine les liens entre les rectangles (représentant les neurones) dans le CNN dans la sélection SVG.
 * @see {@link module:draw-links} pour le code détaillé de cette fonction.
 * @function drawLinks
 * @param {d3.Selection} svg - La sélection SVG où les liens doivent être dessinés.
 */
drawLinks(svg)



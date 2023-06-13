import './cnn.css'
import {select} from 'd3'

import { svgSize } from './global-variables/variables';

import drawCnn from './draw-utils/cnnStructure.js'
import drawAllCharts from './draw-utils/chart/draw-all-charts.js'
import drawLinks from './draw-utils/links/draw-links';

const svg = select('.chart')
    .append('svg')
    .attr('width', svgSize.width)
    .attr('height', svgSize.height);

drawCnn(svg)
drawAllCharts(svg)
drawLinks(svg)



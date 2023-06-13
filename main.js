import './cnn.css'
import {
    select, linkHorizontal, easeLinear
} from 'd3'

import layers from './data/dataGenerator.js'
import { svgSize, rectSize } from './global-variables/variables';

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


//////////////////////////////////////////////////////


// const g = document.querySelectorAll('.node')



// let nodesCoordinates = []

// g.forEach((d, i) => {
//     const rect = d.getBoundingClientRect()
//     let x = rect.x + rect.width / 2
//     let y = rect.y + rect.height / 2
//     nodesCoordinates.push({ x: x, y: y })
// })




// let links = []
// let index = 0;

// layers.forEach((d) => {
//     let tempLinks = []
//     for (let i = 0; i < d.nodes; i++) {
//         tempLinks.push({ coordinates: nodesCoordinates[index], layer: d.id })
//         index++
//     }
//     links.push(tempLinks)
// })


// let cnn = []

// for (let i = 0; i < links.length; i++) {
//     let temp = []
//     if (i === links.length - 1) break;
//     if (links[i][0].layer === links[i + 1][0].layer) {
//         for (let j = 0; j < links[i].length; j++) {
//             temp.push({ source: links[i][j].coordinates, target: links[i + 1][j].coordinates, s: links[i][j].layer, t: links[i + 1][j].layer })
//         }
//         cnn.push(temp)
//     } else {
//         for (let j = 0; j < links[i].length; j++) {
//             for (let p = 0; p < links[i + 1].length; p++) {
//                 temp.push({ source: links[i][j].coordinates, target: links[i + 1][p].coordinates, s: links[i][j].layer, t: links[i + 1][p].layer })
//             }
//         }
//         cnn.push(temp)
//     }
// }


// let cnnLinks = []



// cnn.forEach((d, i) => {
//     d.forEach((d, i) => {
//         cnnLinks.push(linkHorizontal()({
//             source: [d.source.x + rectSize.width / 2, d.source.y],
//             target: [d.target.x - rectSize.width / 2, d.target.y]
//         }))
//     })
// })



// for (let i = 0; i < cnnLinks.length; i++) {
//     svg.append('path')
//         .attr('class', 'cnn-link')
//         .attr('d', cnnLinks[i])
//         .attr('stroke', 'white')
//         .attr('fill', 'none')
//         .transition()
//         .delay((i + 0.5) * 20)
//         .ease(easeLinear)
//         .attr('stroke', 'rgba(0, 0, 0, 0.2)')
// }


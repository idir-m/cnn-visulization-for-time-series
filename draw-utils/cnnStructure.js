import { selectAll, range } from 'd3'
import layers from '../data/dataGenerator.js'
import { svgSize, rectSize } from '../global-variables/variables.js'


const drawCnn = (selection) => {
    selection
        .append('g')
        .attr('class', 'container')
        .attr('transform', `translate(${svgSize.width / 6 - 40}, 0)`)
        .selectAll('g')
        .data(layers)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${(i + 1) * 70 + Math.floor((i - 1) / 3) * 70}, 0)`)
        .attr('id', (d) => d.name.replace(/\s/g, '-').toLowerCase())
        .attr('class', 'layer')
        .selectAll('g')
        .data(d => range(d.nodes))
        .enter()
        .append('g')
        .attr('class', (i) => `node node-${i}`)
        .attr('transform', (i) => `translate(0, ${(i + 1) * 50 + 40})`)
        .append('rect')
        .attr('width', rectSize.width)
        .attr('height', rectSize.height)
        .attr('fill', 'white')
        .attr('stroke', 'rgba(0, 0, 0, 0.5)')


    selectAll('.layer')
        .append('text')
        .text(d => d.name)
        .attr('y', 20)

    selection.select('#input-layer .node')
        .attr('transform', `translate(0, ${svgSize.height / 2 - 20})`)

    selection.select('#output-layer .node')
        .attr('transform', `translate(0, ${svgSize.height / 2 - 20})`)
}



export default drawCnn;
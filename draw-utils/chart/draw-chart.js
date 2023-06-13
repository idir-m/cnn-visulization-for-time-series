import { scaleLinear, extent, line } from 'd3'


const makeChart = (data, selection, yRange, width, height) => {
    const xAccessor = d => d.time
    const yAccessor = d => parseFloat(d.value)

    const xScale = scaleLinear()
        .domain(extent(data, xAccessor))
        .range([0, width])

    const yScale = scaleLinear()
        .domain(yRange)
        .range([height, 0])
        .nice()

    const lineGenerator = line()
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)))

    selection.append('path')
        .datum(data)
        .attr('d', lineGenerator)
        .attr('fill', 'none')
        .attr('stroke', '#30475e')
        .attr('stroke-width', 1)
}

export default makeChart;
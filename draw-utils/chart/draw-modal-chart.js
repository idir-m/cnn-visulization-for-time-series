import { scaleLinear, extent, line, axisLeft, axisBottom, pointer, bisector, select } from 'd3'





const makeChartModal = (data, selection, yRange, width, height) => {
    const xAccessor = d => d.time
    const yAccessor = d => parseFloat(d.value)



    const xScale = scaleLinear()
        .domain(extent(data, xAccessor))
        .range([0, width])


    const yScale = scaleLinear()
        .domain(yRange)
        .range([height, 0])


    const lineGenerator = line()
        .x(d => xScale(xAccessor(d)))
        .y(d => yScale(yAccessor(d)))





    selection.append('path')
        .datum(data)
        .attr('d', lineGenerator)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 1)





    //Axis
    const yAxis = axisLeft(yScale)
        .tickFormat(d => `${d}`)
        .ticks(5)



    selection.append('g')
        .call(yAxis)

    const xAxis = axisBottom(xScale)
        .tickFormat(d => `${d}`)
        .ticks(5)

    selection.append('g')
        .style('transform', `translateY(${height / 2}px)`)
        .call(xAxis)

    //tooltip
    const tooltip = select('#tooltip')
    const tooltipDot = selection.append('circle')
        .attr('r', 5)
        .attr('fill', '#30475e')
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .style('opacity', 0)
        .style('pointer-events', 'none')

    selection.append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('opacity', 0)
        .on(' mousemove', function (event) {
            const mousePos = pointer(event, this)
            const date = xScale.invert(mousePos[0])

            //custom bisector
            const bisect = bisector(xAccessor).left
            const index = bisect(data, date)
            const stock = data[index - 1]

            //update image
            tooltipDot.style("opacity", 1)
                .attr("cx", xScale(xAccessor(stock)))
                .attr("cy", yScale(yAccessor(stock)))
                .raise()

            tooltip.style("display", "block")
                .style("top", yScale(yAccessor(stock)) - 20 + "px")
                .style("left", xScale(xAccessor(stock)) + "px")
                .raise()


        }).raise()

        .on('mouseleave', function () {
            tooltipDot.style('opacity', 0)
            tooltip.style('display', 'none')
        }
        )

}

export default makeChartModal;
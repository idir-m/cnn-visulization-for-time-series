import { scaleLinear, extent, line, interpolateRdYlBu  } from 'd3'


//Méthode pour dessiner un graphique
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


    // Création de l'échelle de couleur
    const colorScale = scaleLinear()
        .domain([yRange[0], yRange[1]])
        .range([0, 1])  // rdYlBu color map is inverted

    // On crée un segment de ligne pour chaque paire de points consécutifs dans les données
    for (let i = 0; i < data.length - 1; i++) {
        const startPoint = data[i];
        const endPoint = data[i + 1];

        // La couleur du segment est déterminée par la valeur du point de départ
        const segmentColor = interpolateRdYlBu(colorScale(yAccessor(startPoint)));

        selection.append('line')
            .attr('x1', xScale(xAccessor(startPoint)))
            .attr('y1', yScale(yAccessor(startPoint)))
            .attr('x2', xScale(xAccessor(endPoint)))
            .attr('y2', yScale(yAccessor(endPoint)))
            .attr('stroke', segmentColor)
            .attr('stroke-width', 1);
    }
}

export default makeChart;
/**
 * @module draw-chart
 */

import { scaleLinear, extent, interpolateRdYlBu } from 'd3'


/**
 * Cette fonction génère un graphique linéaire à partir d'un ensemble de données, dessiné dans une sélection d3 donnée.
 * Chaque segment du graphique est coloré en fonction de la valeur de son point de départ.
 * 
 * @param {Array} data - Les données à utiliser pour le graphique. Chaque élément doit avoir des propriétés `time` et `value`.
 * @param {d3.Selection} selection - La sélection d'éléments HTML où le graphique sera dessiné.
 * @param {Array} yRange - Un tableau à deux valeurs qui spécifie les valeurs minimale et maximale pour l'axe Y.
 * @param {number} width - La largeur du graphique.
 * @param {number} height - La hauteur du graphique.
 */

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
        .range([0, 1])

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
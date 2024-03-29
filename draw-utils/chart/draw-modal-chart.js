/**
 * @module draw-modal-chart
 */


import { scaleLinear, extent, axisLeft, axisBottom, pointer, bisector, select, interpolateRdYlBu } from 'd3'



/**
 * Cette fonction génère un graphique linéaire à partir d'un ensemble de données, dessiné dans une sélection d3 donnée.
 * Chaque segment du graphique est coloré en fonction de la valeur de son point de départ.
 * Les axes X et Y sont créés et affichés, et un tracker peut être ajouté pour suivre la position de la souris.
 * 
 * @param {Array} data - Les données à utiliser pour le graphique. Chaque élément doit avoir des propriétés `time` et `value`.
 * @param {d3.Selection} selection - La sélection d'éléments HTML où le graphique sera dessiné.
 * @param {Array} yRange - Un tableau à deux valeurs qui spécifie les valeurs minimale et maximale pour l'axe Y.
 * @param {number} width - La largeur du graphique.
 * @param {number} height - La hauteur du graphique.
 * @param {boolean} [displayTracker=true] - Un indicateur pour savoir si un tracker doit être affiché pour suivre la position de la souris. 
 *                                         Si vrai, un cercle suivra la position de la souris sur le graphique, et des informations 
 *                                         supplémentaires seront affichées. Par défaut à true.
 */


const makeChartModal = (data, selection, yRange, width, height, displayTracker = true) => {

    const xAccessor = d => d.time
    const yAccessor = d => parseFloat(d.value)

    //Mise en place des écheles 
    const xScale = scaleLinear()
        .domain(extent(data, xAccessor))
        .range([0, width])

    //yRange est un tableau à 2 valeurs contenant les valeurs min et max pour l'axe y
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

        //Ajout des segments au graphique avec la couleur déterminée
        selection.append('line')
            .attr('x1', xScale(xAccessor(startPoint)))
            .attr('y1', yScale(yAccessor(startPoint)))
            .attr('x2', xScale(xAccessor(endPoint)))
            .attr('y2', yScale(yAccessor(endPoint)))
            .attr('stroke', segmentColor)
            .attr('stroke-width', 2);
    }

    //Mise en place des axes x et y pour le graphique
    const yAxis = axisLeft(yScale)
        .tickFormat(d => `${d}`)
        .ticks(5)

    const xAxis = axisBottom(xScale)
        .tickFormat(d => `${d}`)
        .ticks(5)

    //Ajout des axes au graphique
    selection.append('g')
        .call(yAxis)

    selection.append('g')
        .style('transform', `translateY(${height / 2}px)`)
        .call(xAxis)

    //Ajout d'un cercle pour le le suivi de la souris
    if (displayTracker) {

        // const tooltip = select('#tooltip')
        const tooltipDot = selection.append('circle')
            .attr('r', 5)
            .attr('fill', '#30475e')
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .style('opacity', 0)
            .style('pointer-events', 'none')


        // const grid = selection.select('.grid');

        //Ajout d'un rectangle transparent pour détecter le mouvement de la souris
        selection.append('rect')
            .attr('width', width)
            .attr('height', height)
            .style('opacity', 0)
            .on(' mousemove', function (event) {
                const mousePos = pointer(event, this)
                const date = xScale.invert(mousePos[0])

                //Méthode bisect pour trouver le point le plus proche de la souris
                const bisect = bisector(xAccessor).left
                const index = bisect(data, date)
                const stock = data[index - 1]

                //Affichage du tooltip
                tooltipDot.style("opacity", 1)
                    .attr("cx", xScale(xAccessor(stock)))
                    .attr("cy", yScale(yAccessor(stock)))
                    .raise()

                const textInModal0 = select('.grid .text-0');
                textInModal0.text('0');

                const textInModal1 = select('.grid .text-1');
                textInModal1.text(parseFloat(stock.value).toFixed(2));

                const textInModal2 = select('.grid .text-2');
                if (parseFloat(stock.value) < 0) {
                    textInModal2.text('0');
                } else {
                    textInModal2.text(parseFloat(stock.value).toFixed(2));
                }

            }).raise()

            .on('mouseleave', function () {
            }
            )

    }


}

export default makeChartModal;
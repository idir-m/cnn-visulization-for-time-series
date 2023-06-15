import { extent, scaleLinear } from "d3";
import generateOutputData from "./makeOutputData";
import { rectSize } from "../../global-variables/variables";

/**
 * @module draw-output-rects
 */


/**
 * @description Dessine les rectangles de sortie en fonction des données de sortie générées.
 * 
 * La fonction crée une échelle linéaire (myColor) en utilisant les valeurs minimale et maximale des données de sortie triées. Cette échelle est utilisée pour définir la couleur de remplissage des rectangles en fonction de leur valeur.

Ensuite, la fonction sélectionne le dernier nœud (couche de sortie) dans la sélection donnée et ajoute un ensemble de rectangles en fonction des données de sortie. Chaque rectangle a une largeur fixe (rectSize.width), une hauteur de 10 et est positionné verticalement en fonction de son index dans les données de sortie. La couleur de remplissage de chaque rectangle est déterminée par l'échelle myColor en utilisant la valeur de la donnée correspondante.

Finalement, les rectangles de sortie sont dessinés dans la sélection donnée avec les attributs appropriés
 * @param {d3.Selection} selection - La sélection d'éléments DOM où les rectangles de sortie doivent être dessinés.
 */

const drawOutputRects = (selection) => {
    const descendingOutput = generateOutputData();

    const valueAccessor = d => parseFloat(d.value)

    console.log(descendingOutput)
    const myColor = scaleLinear()
        .domain(extent(descendingOutput, valueAccessor))
        .range(['white', 'blue'])

    const lastNode = selection.select('#output .node')


    lastNode.selectAll('.out')
        .data(descendingOutput)
        .enter()
        .append('rect')
        .attr('class', 'nodeRect')
        .attr('width', rectSize.width)
        .attr('height', 10)
        .attr('y', (d, i) => i * 11)
        .attr('fill', (d) => myColor(valueAccessor(d)))
        .attr('stroke', 'rgba(0, 0, 0, 0.5)')



}

export default drawOutputRects;
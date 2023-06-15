/**
 * @module cnnStructure
 */


import { range, selectAll } from 'd3'
import layers from '../data/dataGenerator.js'
import { svgSize, rectSize } from '../global-variables/variables.js'


/**
 * La fonction drawCnn génère la structure complète d'un réseau neuronal convolutif (CNN).
 * <ol>
  <li>Crée un groupe principal (conteneur) dans la sélection spécifiée, avec une transformation appliquée pour le positionnement.</li>
  <li>Ajoute ensuite un groupe pour chaque couche dans les données de 'layers', en positionnant chaque groupe en fonction de son index.</li>
  <li>Chaque groupe de couche reçoit un ID basé sur le nom de la couche et une classe de 'layer'.</li>
  <li>Dans chaque groupe de couche, un groupe supplémentaire est ajouté pour chaque noeud dans la couche, encore une fois positionné en fonction de son index.</li>
  <li>Dans chaque noeud, un rectangle est dessiné avec les dimensions spécifiées, rempli de blanc et avec un trait noir.</li>
  <li>Après avoir ajouté tous les noeuds, un élément texte est ajouté à chaque couche avec le nom de la couche comme contenu.</li>
  <li>Enfin, les groupes de noeuds des couches d'entrée et de sortie sont repositionnés pour être centrés verticalement.</li>
</ol>
 * @param {d3.Selection} selection - La sélection d'éléments DOM où le CNN sera dessiné.
 *
 * 
 */

const drawCnn = (selection) => {


    const colors = {
        white: 'rgb(255, 255, 255)',
        black: '#0F111A'
    }

    selection
        //Création du conteneur principal
        .append('g')
        .attr('class', 'container')
        .attr('transform', `translate(${svgSize.width / 6 - 40}, 0)`)
        .selectAll('g')
        .data(layers)
        .enter()
        //Création des layers
        .append('g')
        .attr('transform', (d, i) => `translate(${(i + 1) * 70 + Math.floor((i - 1) / 3) * 70}, 0)`)
        .attr('id', (d) => d.name.replace(/\s/g, '-').toLowerCase())
        .attr('class', 'layer')
        .selectAll('g')
        .data(d => range(d.nodes))
        .enter()
        //Création des nodes
        .append('g')
        .attr('class', `node nodeRect`)
        .attr('transform', (i) => `translate(0, ${(i + 1) * 50 + 40})`)
        .append('rect')
        .attr('width', rectSize.width)
        .attr('height', rectSize.height)
        .attr('fill', `${colors.black}`)
        .attr('stroke', 'rgba(0, 0, 0, 0.5)')


    selectAll('.layer')
        .append('text')
        .text(d => d.name)
        .attr('y', 20)

    //Cetrer les layers input et output
    selection.select('#input .node')
        .attr('transform', `translate(0, ${svgSize.height / 2 - 20})`)

    selection.select('#output .node')
        .attr('transform', `translate(0, ${svgSize.height / 2 - 50})`)




}



export default drawCnn;
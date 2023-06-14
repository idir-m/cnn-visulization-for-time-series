import constructCnnLinkingData from "./makeDataLinks"
import { linkHorizontal, easeLinear } from "d3"
import { rectSize } from "../../global-variables/variables"

/**
 * @module draw-links
 * @description Ce module fournit des fonctions pour générer des liens entre les rectangles en utilisant linkHorizontal et pour dessiner ces liens 
 * sur la sélection d'éléments SVG donnée.
 */


/**
 * Fonction pour générer les liens entre les rectangles. 
 * Les liens sont représentés par des chemins de courbes horizontaux (path).
 * @returns {string[]} - Un tableau de chaînes de caractères où chaque chaîne représente le chemin d'un lien entre les rectangles.
 */
const linkCnnWhithD3 = () => {

    let cnnLinks = []
    const cnn = constructCnnLinkingData();

    cnn.forEach((d, i) => {
        d.forEach((d, i) => {
            cnnLinks.push(linkHorizontal()({
                source: [d.source.x + rectSize.width / 2, d.source.y],
                target: [d.target.x - rectSize.width / 2, d.target.y]
            }))
        })
    })

    return cnnLinks;
}

/**
 * Fonction pour dessiner les liens entre les rectangles du réseau sur la sélection d'éléments SVG donnée. 
 * Cette fonction utilise la fonction linkCnnWhithD3 pour générer les chemins de liens et les dessine ensuite sur la sélection.
 * @param {Selection} selection - La sélection d'éléments SVG où les liens doivent être dessinés.
 */
const drawLinks = (selection) => {
    const cnnLinks = linkCnnWhithD3();
    for (let i = 0; i < cnnLinks.length; i++) {
        selection.append('path')
            .attr('class', 'cnn-link')
            .attr('d', cnnLinks[i])
            .attr('stroke', '#fafafa')
            .attr('fill', 'none')
            .transition()
            .delay((i + 0.5) * 20)
            .ease(easeLinear)
            .attr('stroke', 'rgba(0, 0, 0, 0.25)')
    }
}


export default drawLinks;



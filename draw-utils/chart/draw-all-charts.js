import makeChart from './draw-chart'
import makeChartModal from './draw-modal-chart'
import { extent, min, max, select } from 'd3'
import { idLayers, layersDataOrganized } from './makeDataChart'
import drawOutputRects from '../output/draw-output-rects'
import { rectSize, modalSize } from '../../global-variables/variables'


/**
 * @module draw-all-charts
 * @description Ce module contient des fonctions pour dessiner des graphiques de données, pour les différents types de couches de données.
 * Il comprend des fonctionnalités pour dessiner des graphiques à partir de données organisées en couches et pour gérer les interactions de l'utilisateur, comme cliquer sur un rectangle pour voir des détails supplémentaires.
 */

//Récupération des données organisées par couche et par noeud dans un tableau à 3 dimensions
const layersData = layersDataOrganized();

const modal = document.querySelector('.modal')



/**
 * Fonction pour gérer le clic sur un rectangle de donnée. Dessine un graphique modal détaillé pour une couche et un nœud donnés.
 * @param {number} i - Index de la couche.
 * @param {number} j - Index du nœud.
 * @param {number[]} yRange - Plage des valeurs pour l'axe y.
 */

const onClickRect = (i, j, yRange) => {
    const data = layersData[i][j]

    const modalContent = select('.modal-content')
    modalContent.selectAll('*').remove()
    const svgModal = modalContent
        .append('svg')
        .attr('width', modalSize.width)
        .attr('height', modalSize.height)


    const g = svgModal.append('g')
        .attr('transform', `translate(20, 0)`)


    makeChartModal(data, g, yRange, modalSize.width, modalSize.height)
    modal.showModal();

}


/**
 * Fonction pour gérer le clic sur un rectangle de donnée pour une couche activation. Dessine un graphique modal détaillé pour une couche et un nœud donnés.
 * @param {number} i - Index de la couche.
 * @param {number} j - Index du nœud.
 * @param {number[]} yRange - Plage des valeurs pour l'axe y.
 * @param {boolean} displayTracker - Indicateur pour afficher le suivi quand il est à faux on n'affiche pas le trackeur.
 */

const onClickRectActivation = (i, j, yRange, displayTracker) => {

    //Récupération des données de la couche actuelle
    const data = layersData[i][j]
    //Récupération des données de la couche précédente
    const data2 = layersData[i - 1][j]

    const modalContent = select('.modal-content')
    modalContent.selectAll('*').remove()
    const svgModal = modalContent
        .append('svg')
        .attr('width', modalSize.width)
        .attr('height', modalSize.height / 2)


    //Ajout des labels pour les données d'entrée et de sortie dans la fenetre modal
    svgModal.append('g')
        .attr('transform', `translate(20, 25)`)
        .append('text')
        .attr('class', 'labelInput')
        .attr('x', 50)
        .attr('y', 15)
        .text('Input')
        .style('font-size', '20px')



    svgModal.append('g')
        .attr('transform', `translate(700, 25)`)
        .append('text')
        .attr('class', 'labelOutput')
        .attr('x', 50)
        .attr('y', 15)
        .text('Output')
        .style('font-size', '20px')

    svgModal.append('g')
        .attr('transform', `translate(400, 10)`)
        .append('text')
        .attr('class', 'labelHeader')
        .attr('x', 50)
        .attr('y', 15)
        .text('Activation')
        .style('font-size', '20px')
        .style('font-weight', 'bold')




    //Ajout des conteneurs pour les chartes des données d'entrée et de sortie dans la fenetre modal
    const g = svgModal.append('g')
        .attr('transform', `translate(20, 30)`)

    const g2 = svgModal.append('g')
        .attr('transform', `translate(700, 30)`)


    //ajout de la grille pour la visualisation des données de la fonction d'activation
    const grid = modalContent.append('div')
        .attr('class', 'grid')

    for (let i = 0; i < 3; i++) {
        if (i == 0) { grid.append('span').text('max( '); }
        if (i == 1) { grid.append('span').text(' , '); }
        if (i == 2) { grid.append('span').text(' ) = '); }
        // Ajoutez un svg
        let svg = grid.append('svg')
            .attr('width', 25)
            .attr('height', 20);

        let g = svg.append('g');
        // Ajoutez un rect
        g.append('rect')
            .attr('class', `rect-${i}`)
            .attr('width', 25)
            .attr('height', 20)
            .attr('fill', 'white')
            .attr('stroke', 'black');

        // Ajoutez un élément de texte au groupe
        g.append('text')
            .attr('class', `text-${i}`)
            .attr('fill', 'black')
            .attr('x', 5)
            .attr('y', 15);

    }

    makeChartModal(data2, g, yRange, modalSize.width / 2.5, modalSize.height / 2.5)
    makeChartModal(data, g2, yRange, modalSize.width / 2.5, modalSize.height / 2.5, displayTracker)
    modal.showModal();

}


/**
 * Dessine tous les graphiques des couches et des nœuds dans une sélection donnée. Associe également des gestionnaires d'événements pour gérer les interactions de l'utilisateur.
 * @param {Selection} selection - La sélection DOM pour placer les graphiques.
 */

const drawAllCharts = (selection) => {

    //Récupération des id des layers dans un tableau
    const id = idLayers();

    //Pour chaque layer, on récupère les noeuds et on génère les graphiques
    id.forEach((layer, i) => {
        const nodes = selection.selectAll(`#${layer} .node`)

        let rangeTab = []
        layersData[i].forEach((nodeData) => {
            rangeTab.push(extent(nodeData, d => parseFloat(d.value)))
        })


        //Récupération des valeurs min et max de chaque colonne en valeur absolue
        let minTab = []
        let maxTab = []

        rangeTab.forEach((range) => {
            minTab.push(range[0])
            maxTab.push(range[1])
        })

        let maxRange = [min(minTab), max(maxTab)]

        if (maxRange[0] * -1 > maxRange[1]) {
            maxRange[1] = maxRange[0] * -1
        } else {
            maxRange[0] = maxRange[1] * -1
        }

        /////////////////////////////////////////

        if (i < layersData.length - 1) {
            layersData[i].forEach((nodeData, j) => {
                // Si la couche est une couche d'activation, on ajoute un événement au clic sur le rectangle avec la fonction onClickRectActivation (à modifier selon les besoins)
                if (i !== 0 && i % 3 === 0) {
                    nodes._groups[0][j].addEventListener('click', () => onClickRectActivation(i, j, maxRange, false))
                    makeChart(nodeData, select(nodes._groups[0][j]), maxRange, rectSize.width, rectSize.height)
                } else {
                    nodes._groups[0][j].addEventListener('click', () => onClickRect(i, j, maxRange))
                    makeChart(nodeData, select(nodes._groups[0][j]), maxRange, rectSize.width, rectSize.height)
                }

            })
        }
    })


    drawOutputRects(selection)
    const closeModal = document.querySelector('.close-btn')

    closeModal.addEventListener('click', () => {
        modal.close()
    })

}

export default drawAllCharts




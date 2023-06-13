import makeChart from './draw-chart'
import makeChartModal from './draw-modal-chart'
import { extent, min, max, select } from 'd3'
import { idLayers, layersDataOrganized } from './makeDataChart'
import { rectSize, modalSize } from '../../global-variables/variables'

//Récupération des données organisées par couche et par noeud dans un tableau à 3 dimensions
const layersData = layersDataOrganized();

const modal = document.querySelector('.modal')

//Méthode pour générer les graphiques dans la fenêtre modale lors du clic sur un rectangle
const onClickRect = ( i, j, yRange) => {

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

//Méthode pour générer les graphiques dans les rectangles
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

        //Ajout d'un eventListener sur chaque noeud pour générer le graphique 
        layersData[i].forEach((nodeData, j) => {
            nodes._groups[0][j].addEventListener('click', () => onClickRect( i, j, maxRange))
            makeChart(nodeData, select(nodes._groups[0][j]), maxRange, rectSize.width, rectSize.height)
        })
    })

    const closeModal = document.querySelector('.close-btn')

    closeModal.addEventListener('click', () => {
        modal.close()
    })

}

export default drawAllCharts




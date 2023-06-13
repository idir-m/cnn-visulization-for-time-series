import makeChart from './draw-chart'
import makeChartModal from './draw-modal-chart'
import { extent, min, max, select } from 'd3'
import { idLayers, layersDataOrganized } from './makeDataChart'
import { rectSize, modalSize } from '../../global-variables/variables'

const layersData = layersDataOrganized();

const modal = document.querySelector('.modal')

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


const drawAllCharts = (selection) => {

    const id = idLayers();


    id.forEach((layer, i) => {
        const nodes = selection.selectAll(`#${layer} .node`)

        let rangeTab = []
        layersData[i].forEach((nodeData) => {
            rangeTab.push(extent(nodeData, d => parseFloat(d.value)))
        })
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

        if (i < id.length - 1) {
            layersData[i].forEach((nodeData, j) => {
                nodes._groups[0][j].addEventListener('click', () => onClickRect(i, j, maxRange))
                makeChart(nodeData, select(nodes._groups[0][j]), maxRange, rectSize.width, rectSize.height)
            })
        }

    })

    console.log(layersData[layersData.length - 1])


    const closeModal = document.querySelector('.close-btn')

    closeModal.addEventListener('click', () => {
        modal.close()
    })

}

export default drawAllCharts




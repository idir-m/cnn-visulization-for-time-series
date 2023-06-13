import layers from '../../data/dataGenerator.js'


const idLayers = () => {
    const layersElements = document.querySelectorAll('.layer')

    let id = []

    layersElements.forEach(elem => {
        id.push(elem.id)
    })

    return id
}


const layersDataOrganized = () => {
    let layersData = []

    layers.forEach((layer) => {
        if (layer.id === 0) {
            const inputData = layer.data.map((node, index) => {
                return {
                    time: index,
                    value: Object.values(node)[0]
                }
            })
            layersData.push([inputData])
        } else {
            let nodesData = []

            layer.data.forEach((node) => {
                if (node.hasOwnProperty('filter')) delete node['filter']

                nodesData.push(Object.values(node).map((value, index) => {
                    return {
                        time: index,
                        value: value
                    }
                }))
            })

            layersData.push(nodesData)
        }
    })
    return layersData;
}

export { idLayers, layersDataOrganized }
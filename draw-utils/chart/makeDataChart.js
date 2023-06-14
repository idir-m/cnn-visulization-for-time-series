/**
 * @module makeDataChart
 */

import layers from '../../data/dataGenerator.js'



/**
 * Cette fonction parcourt tous les éléments de la classe `.layer` dans le document, 
 * récupère leurs identifiants et les retourne dans un tableau.
 * 
 * @returns {Array} Un tableau contenant les identifiants des éléments de la classe `.layer`.
 */

const idLayers = () => {
    const layersElements = document.querySelectorAll('.layer')

    let id = []

    layersElements.forEach(elem => {
        id.push(elem.id)
    })

    return id
}


/**
 * Cette fonction organise les données de chaque couche de données dans un tableau 3D. 
 * Pour chaque couche, si l'id de la couche est 0, on fait en sorte d'avoir la meme forme de donnée pour la couche 1 et les autres couches. Si l'id de la couche n'est pas 0, un objet est créé 
 * pour chaque valeur dans chaque nœud, avec le temps (basé sur l'index) et la valeur.
 * 
 * @returns {Array} Un tableau 3D contenant les données de chaque couche. Le tableau 
 *                  contient un tableau pour chaque couche, qui contient un tableau 
 *                  pour chaque nœud, qui contient un objet pour chaque valeur.
 */

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
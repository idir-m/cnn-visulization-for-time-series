import { descending } from "d3";
import { layersDataOrganized } from "../chart/makeDataChart"

/**
 * @module makeOutputData
 */


/**
 * Génère les données de sortie triées par ordre décroissant à partir des données organisées par couche.
 * @returns {Object[]} - Un tableau d'objets représentant les données de sortie triées par ordre décroissant.
 */
const generateOutputData = () => {
    const layersData = layersDataOrganized();

    const outputLayer = layersData[layersData.length - 1]

    const outputTab = []
    outputLayer.forEach((data) => {
        outputTab.push(...data)
    })
    return outputTab

}

export default generateOutputData;
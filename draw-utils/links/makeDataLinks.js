import layers from "../../data/dataGenerator"


const getRectsCoordinates = () => {

    const g = document.querySelectorAll('.node')

    let nodesCoordinates = []

    g.forEach((d) => {
        const rect = d.getBoundingClientRect()
        let x = rect.x + rect.width / 2
        let y = rect.y + rect.height / 2
        nodesCoordinates.push({ x: x, y: y })
    })

    return nodesCoordinates;
}

//Méthode pour lier chaque rectangle à ses coordonnées en attribuant un id de layer
const linkEachRectToCoordinates = () => {
    let links = []
    let index = 0;

    const nodesCoordinates = getRectsCoordinates();

    layers.forEach((d) => {
        let tempLinks = []
        for (let i = 0; i < d.nodes; i++) {
            tempLinks.push({ coordinates: nodesCoordinates[index], layer: d.id })
            index++
        }
        links.push(tempLinks)
    })

    console.log(links)
    return links;
}

//Méthode pour construire les données de liens entre les rectangles
const constructCnnLinkingData = () => {
    const links = linkEachRectToCoordinates();

    let cnn = []

    //On compare les layers de chaque rectangle pour savoir si on doit créer un lien entre eux
    for (let i = 0; i < links.length; i++) {
        let temp = []
        //Si on est au dernier layer, on arrête la boucle
        if (i === links.length - 1) break;
        //Si les layers sont identiques, on crée un lien entre les rectangles
        if (links[i][0].layer === links[i + 1][0].layer) {
            for (let j = 0; j < links[i].length; j++) {
                temp.push({ source: links[i][j].coordinates, target: links[i + 1][j].coordinates, s: links[i][j].layer, t: links[i + 1][j].layer })
            }
            cnn.push(temp)
            //Sinon, on crée un lien entre chaque rectangle du layer i avec chaque rectangle du layer i+1
        } else {
            for (let j = 0; j < links[i].length; j++) {
                for (let p = 0; p < links[i + 1].length; p++) {
                    temp.push({ source: links[i][j].coordinates, target: links[i + 1][p].coordinates, s: links[i][j].layer, t: links[i + 1][p].layer })
                }
            }
            cnn.push(temp)
        }
    }

    return cnn;
}

export default constructCnnLinkingData;
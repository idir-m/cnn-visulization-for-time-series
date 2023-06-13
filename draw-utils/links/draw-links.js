import constructCnnLinkingData from "./makeDataLinks"
import { linkHorizontal, easeLinear } from "d3"
import { rectSize } from "../../global-variables/variables"



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


const drawLinks = (selection) => {
    const cnnLinks = linkCnnWhithD3();
    for (let i = 0; i < cnnLinks.length; i++) {
        selection.append('path')
            .attr('class', 'cnn-link')
            .attr('d', cnnLinks[i])
            .attr('stroke', 'white')
            .attr('fill', 'none')
            .transition()
            .delay((i + 0.5) * 20)
            .ease(easeLinear)
            .attr('stroke', 'rgba(0, 0, 0, 0.2)')
    }
}


export default drawLinks;



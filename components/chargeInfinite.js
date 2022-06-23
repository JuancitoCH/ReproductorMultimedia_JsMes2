import mapeo from "../helpers/mapeo.js"
import { Miniatura } from "./miniatura.js"

const observerElement = new IntersectionObserver(interCallback, {
    threshold: .5
})
export default function chargeInfinite() {
    const mainContainer = document.createElement('div')
    mainContainer.classList.add('infinite-main-reproductor')
    mainContainer.id = ('infinite-main-reproductor')
    observerElement.observe(mainContainer)


    return mainContainer
}

function interCallback(entries) {
    // console.log(entries)
    for (let entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= .5) {
            fetch('./assets/assets/videos.json')
                .then(data => data.json())
                .then(data => {
                    if (entry.target.parentNode.id =='infinite-main-reproductor'){
                        mapeo(entry.target.parentNode, data.videos.all, Miniatura)
                        observerElement.observe(entry.target.parentNode.lastChild)
                    }
                    if(entry.target.parentNode.id !='infinite-main-reproductor'){
                        mapeo(entry.target, data.videos.all, Miniatura)                
                        observerElement.observe(entry.target.lastChild)
                    }
                    observerElement.unobserve(entry.target)
                })
        }
    }

}
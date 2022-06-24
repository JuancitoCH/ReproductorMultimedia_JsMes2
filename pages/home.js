import homeWelcome from "../components/homeWelcome.js"
import { Miniatura } from "../components/miniatura.js"
import Portada from "../components/portada.js"
import mapeo from "../helpers/mapeo.js"

const intersection = new IntersectionObserver((entryes)=>{
    for(let entries of entryes){
        if(entries.isIntersecting && entries.intersectionRatio>.5){
            entries.target.style.animation=" videoMusicAppear 1s ease-in forwards"
            intersection.unobserve(entries.target)
        }
    }
    console.log(entryes)
    
},{ threshold:.5 })

export default function RenderHome() {
    const Home = document.createElement('div')
    const videos = document.createElement('section')
    const musics = document.createElement('section')

    Home.classList.add('Home')
    videos.classList.add('videos')
    musics.classList.add('musics')


    fetch('./assets/assets/videos.json')
    .then(data => data.json())
    .then(data=>{
        mapeo(videos,data.videos.all,Miniatura)
        mapeo(musics,data.musics.all,Portada)
        Home.appendChild(homeWelcome())
        Home.appendChild(videos)
        Home.appendChild(musics)
        const extra1 = videos.cloneNode(true)
        Home.appendChild(extra1)
        const extra2 = videos.cloneNode(true)
        Home.appendChild(extra2)
        const extra3 = videos.cloneNode(true)
        Home.appendChild(extra3)

        Home.childNodes.forEach((e)=>intersection.observe(e))
    })

   

    return Home
}


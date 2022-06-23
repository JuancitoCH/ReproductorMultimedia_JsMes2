import homeWelcome from "../components/homeWelcome.js"
import { Miniatura } from "../components/miniatura.js"
import Portada from "../components/portada.js"
import mapeo from "../helpers/mapeo.js"


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
        
    })



    return Home
}




// const pelis = [
//     {   
//         id:23,
//         img: '',
//         duration: '1:35',
//         titulo: 'Meme Ben 10'
//     },
//     {
//         id:22,
//         img: '',
//         duration: '1:35',
//         titulo: 'Meme Ben 10'
//     },
//     {
//         id:22,
//         img: '',
//         duration: '1:35',
//         titulo: 'Meme Ben 10'
//     },
//     {
//         id:22,
//         img: '',
//         duration: '1:35',
//         titulo: 'Meme Ben 10'
//     },
//     {
//         id:22,
//         img: '',
//         duration: '1:35',
//         titulo: 'Meme Ben 10'
//     },
//     {
//         id:22,
//         img: '',
//         duration: '1:35',
//         titulo: 'Meme Ben 10'
//     },
//     {
//         id:22,
//         img: 'https://1.bp.blogspot.com/-Sb-2Qt9js-M/YAu568byXPI/AAAAAAAAElc/KRxnGaBmUr0xaU4DQVF0Q9cMcCcoFDHQQCLcBGAsYHQ/s1920/B10K-TVLaint.jpg',
//         duration: '1:35',
//         titulo: 'Meme Ben 10'
//     },
//     {
//         id:22,
//         img: '',
//         duration: '1:35',
//         titulo: 'Meme Ben 10'
//     },
//     {
//         id:22,
//         img: '',
//         duration: '1:35',
//         titulo: 'Meme Ben 10'
//     },
//     {
//         id:22,
//         img: '',
//         duration: '1:35',
//         titulo: 'Meme Ben 10'
//     },
//     {
//         id:22,
//         img: '',
//         duration: '1:35',
//         titulo: 'Meme Ben 10'
//     },
// ]

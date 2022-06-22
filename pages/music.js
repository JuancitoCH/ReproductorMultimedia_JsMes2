import reproductorMusic from "../components/reproductorMusic.js"

export default function musicReproductorPage(id){
    const Rep = document.createElement('div')
    fetch('./assets/assets/videos.json')
    .then(data => data.json())
    .then(data=>{
        const [music] = data.musics.all.filter(el=>el.id==id)
        console.log(music)
        const reproductorConstruct = reproductorMusic(music)
        Rep.appendChild(reproductorConstruct)
    })
    return Rep
}
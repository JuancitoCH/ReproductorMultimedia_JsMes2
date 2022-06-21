import reproductorVideo from "../components/reproductorVideo.js"


export default function reproductor(id){
    const idp = document.createElement('div')

    fetch('./assets/assets/videos.json')
    .then(data => data.json())
    .then(data=>{
        const [video] = data.videos.all.filter(el=>el.id==id)
        const reproductorConstruct=reproductorVideo(video)
        idp.appendChild(reproductorConstruct)
    })

    return idp
}
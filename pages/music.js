export default function musicReproductor(id){
    const Rep = document.createElement('div')
    fetch('./assets/assets/videos.json')
    .then(data => data.json())
    .then(data=>{
        const [music] = data.musics.all.filter(el=>el.id==id)
        // const reproductorConstruct=reproductorVideo(video)
        // idp.appendChild(reproductorConstruct)
        console.log(music)
    })
    return Rep
}
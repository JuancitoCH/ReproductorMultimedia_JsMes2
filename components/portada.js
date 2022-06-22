export default function Portada({id,name,src,cover,duration}){
    const SongContainer = document.createElement('article')
    const coverContainer = document.createElement('div')
    const coverImg = document.createElement('img')
    const songName = document.createElement('p')

    SongContainer.id=id
    coverImg.src=cover
    songName.textContent=name

    SongContainer.classList.add('song-container')
    coverContainer.classList.add('cover-container')
    coverImg.classList.add('cover')
    songName.classList.add('song-name')

    coverContainer.appendChild(coverImg)
    SongContainer.appendChild(coverContainer)
    SongContainer.appendChild(songName)

    SongContainer.onclick = e=>{
        window.location.hash='/music/'+id
    }
    return SongContainer
}
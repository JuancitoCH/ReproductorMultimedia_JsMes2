export default function reproductorMusic({id,name,cover,src}){
    const containerMusic = document.createElement('section')

    const audioRep = document.createElement('audio')
    
    audioRep.setAttribute('src',src)
    
    containerMusic.classList.add('audioContainer-g')

    containerMusic.appendChild(audioRep)
    containerMusic.appendChild(portada(id,name,cover))
    containerMusic.appendChild(reproductorControls(audioRep))
    
    return containerMusic
}

function reproductorControls(audio){
    const containerControlsFather = document.createElement('div')
    const container = document.createElement('div')
    const timeRep = document.createElement('input')
    const soundRep = document.createElement('input')
    const playBtn = document.createElement('button')
    const loopBtn = document.createElement('button')

    timeRep.setAttribute('type','range')
    timeRep.setAttribute('max','100')
    timeRep.setAttribute('min','0')
    timeRep.setAttribute('step','0.5')

    soundRep.setAttribute('type','range')
    soundRep.setAttribute('max','1')
    soundRep.setAttribute('min','0')
    soundRep.setAttribute('step','0.05')

    playBtn.textContent='.'

    loopBtn.textContent='<>'

    containerControlsFather.classList.add('music-control-container-father')
    container.classList.add('music-control-container')
    timeRep.classList.add('music-reproductor')
    soundRep.classList.add('music-sound')
    playBtn.classList.add('music-play-btn')
    loopBtn.classList.add('music-loop-btn')

    

    container.appendChild(playBtn)
    container.appendChild(timeRep)
    container.appendChild(soundRep)
    container.appendChild(loopBtn)
    funtionalitiesRep(audio,timeRep,soundRep,playBtn,loopBtn)
    containerControlsFather.appendChild(container)

    return containerControlsFather
}

function funtionalitiesRep(audio,time,sound,playBtn,loopBtn){
    let duration=0

    playBtn.addEventListener('click',e=>{
        if(!audio.paused){
            audio.pause()
            playBtn.style.webkitMaskImage= "url('./static/svg/ic-round-play-arrow.svg')"
            playBtn.style.webkitMaskSize='3rem'
        }else{
            audio.play()
            playBtn.style.webkitMaskImage="url('./static/svg/IcRoundPause.svg')"
            playBtn.style.webkitMaskSize=''
        }
    })

    audio.addEventListener('loadeddata',(e)=>{
        audio.play()
        audio.loop = true
        duration = audio.duration
        const volume = localStorage.getItem('audioVolume') 
        volume ? audio.volume=volume : audio.volume=.4
        sound.value = audio.volume
    })

    audio.addEventListener('timeupdate',(e)=>{
        const percentage = (e.target.currentTime / e.target.duration)*100
        time.value = percentage
        time.style.backgroundSize = percentage + '%'
    })

    time.addEventListener('input',(e)=>{
        audio.currentTime = (duration / 100) * e.target.value
        time.style.backgroundSize = (audio.currentTime / duration) * 100 + '%'
        
    })
    sound.addEventListener('input',(e)=>{
        audio.volume = sound.value
        localStorage.setItem('audioVolume',audio.volume)
    })
    loopBtn.addEventListener('click',e=>{
        audio.loop? audio.loop=false:audio.loop=true
    })
    
}

function portada(id,name,coverUrl){
    
    const portadaContainer = document.createElement('article')
    const portada = document.createElement('div')
    const img = document.createElement('img')
    const title = document.createElement('h3')


    img.src=coverUrl
    title.textContent=name

    portada.appendChild(img)
    portada.appendChild(title)

    portadaContainer.appendChild(portada)
    return portadaContainer
}
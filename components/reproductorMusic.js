export default function reproductorMusic({id,name,cover,src}){
    const containerMusic = document.createElement('section')

    const audioRep = document.createElement('audio')
    
    audioRep.setAttribute('src',src)
    audioRep.classList.add('audioMedia')
    
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
    const prevBtn = document.createElement('button')
    const nextBtn = document.createElement('button')

    timeRep.setAttribute('type','range')
    timeRep.setAttribute('max','100')
    timeRep.setAttribute('min','0')
    timeRep.setAttribute('step','0.005')

    soundRep.setAttribute('type','range')
    soundRep.setAttribute('max','1')
    soundRep.setAttribute('min','0')
    soundRep.setAttribute('step','0.05')

    playBtn.textContent='.'
    prevBtn.textContent='.'
    nextBtn.textContent='.'

    loopBtn.textContent='<>'

    containerControlsFather.classList.add('music-control-container-father')
    container.classList.add('music-control-container')
    timeRep.classList.add('music-reproductor')
    soundRep.classList.add('music-sound')
    playBtn.classList.add('music-play-btn')
    loopBtn.classList.add('music-loop-btn')
    prevBtn.classList.add('music-prev-btn')
    nextBtn.classList.add('music-next-btn')
    

    

    container.appendChild(prevBtn)
    container.appendChild(playBtn)
    container.appendChild(nextBtn)
    container.appendChild(loopBtn)
    container.appendChild(soundRep)

    funtionalitiesRep(audio,timeRep,soundRep,playBtn,loopBtn)

    containerControlsFather.appendChild(container)
    containerControlsFather.appendChild(timeRep)

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
        audio.loop = false
        duration = audio.duration
        const volume = localStorage.getItem('audioVolume') 
        volume ? audio.volume=volume : audio.volume=.4
        sound.value = audio.volume
        resetSoundIcon(audio)
        sound.style.backgroundSize = sound.value*100+'%'
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
        resetSoundIcon(audio)
        sound.style.backgroundSize = audio.volume*100+'%'
    })
    loopBtn.addEventListener('click',e=>{
        if(audio.loop){
            audio.loop=false
            loopBtn.style.backgroundColor=''
            loopBtn.style.color=''
        }else{
            loopBtn.style.backgroundColor='#7e0606'
            loopBtn.style.color='#7e0606'
            audio.loop=true
        }
    })
    
}

function portada(id,name,coverUrl){
    
    const portadaContainer = document.createElement('article')
    const portada = document.createElement('div')
    const img = document.createElement('img')
    const title = document.createElement('h3')


    img.src=coverUrl
    title.textContent=name

    portadaContainer.classList.add('container-music-portada')
    portada.classList.add('portada-music')
    img.classList.add('portada-music-img')
    title.classList.add('portada-music-title')

    portada.appendChild(img)
    portada.appendChild(title)

    portadaContainer.appendChild(portada)
    return portadaContainer
}

function resetSoundIcon(audio){
    if(audio.volume ==0){
        const variableBack = getComputedStyle(document.documentElement).getPropertyValue('--backgrund-sound-none')
        document.documentElement.style.setProperty('--backgrund-sound',variableBack)
       
    }else if(audio.volume>=0.5){
        const variableBack = getComputedStyle(document.documentElement).getPropertyValue('--backgrund-sound-high')
        document.documentElement.style.setProperty('--backgrund-sound',variableBack)
    }
    else{
        const variableBack = getComputedStyle(document.documentElement).getPropertyValue('--backgrund-sound-low')
        document.documentElement.style.setProperty('--backgrund-sound',variableBack)
    }
}
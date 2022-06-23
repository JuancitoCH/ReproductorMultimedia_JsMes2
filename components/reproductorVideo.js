

export default function reproductorVideo({ id, name, tumbnail, src, duration }) {
    // The Main Component
    const video_container = document.createElement('section')
    const videoTag = document.createElement('video')
    const source = document.createElement('source')
    // videoTag.setAttribute('controls','')
    videoTag.setAttribute('id', 'video')

    source.src = src
    source.type = 'video/mp4'

    video_container.classList.add('video-container')

    videoTag.appendChild(source)
    video_container.appendChild(videoTag)
    video_container.appendChild(controls(videoTag, video_container))

    return video_container
}

function controls(video, video_container) {
    const video_controls = document.createElement('div')
    const playBtn = document.createElement('button')
    const barraReproduccion = document.createElement('input')
    const timeVideo = document.createElement('p')
    const fullScreenBtn = document.createElement('button')
    const backBtn = document.createElement('button')
    const forwBtn = document.createElement('button')
    const volumeControl = document.createElement('input')

    playBtn.setAttribute('id', 'play')
    video_controls.setAttribute('class', 'video-controls')
    barraReproduccion.setAttribute('id', 'control')
    barraReproduccion.setAttribute('type', 'range')
    barraReproduccion.setAttribute('min', '0')
    barraReproduccion.setAttribute('max', '100')
    barraReproduccion.setAttribute('step', '0.1')
    barraReproduccion.setAttribute('value', '0')
    backBtn.setAttribute('id', 'backwardSeconds')
    forwBtn.setAttribute('id', 'forwardSeconds')

    volumeControl.setAttribute('class', 'volume-video')
    volumeControl.setAttribute('type', 'range')
    volumeControl.setAttribute('min', '0')
    volumeControl.setAttribute('max', '1')
    volumeControl.setAttribute('step', '.05')


    playBtn.classList.add('reproductor-play-btn')
    fullScreenBtn.classList.add('reproductor-full-btn')
    timeVideo.classList.add('reproductor-timer')

    playBtn.textContent = '>'
    fullScreenBtn.textContent = 'Full'
    forwBtn.textContent = '10 >>'
    backBtn.textContent = '<< 10'
    timeVideo.textContent='0:00'

    video_controls.appendChild(playBtn)
    video_controls.appendChild(barraReproduccion)
    video_controls.appendChild(timeVideo)
    video_controls.appendChild(volumeControl)
    video_controls.appendChild(fullScreenBtn)

    video_container.appendChild(forwBtn)
    video_container.appendChild(backBtn)

    // add functionality to the elemnts
    videosFunctionality(video,
        video_container,
        playBtn,
        barraReproduccion,
        fullScreenBtn,
        forwBtn,
        backBtn,
        video_controls,
        volumeControl,
        timeVideo
    )
    return video_controls
}

function videosFunctionality(
    video,
    video_container,
    play,
    barra,
    full,
    forwBtn,
    backBtn,
    video_controls,
    volumeControl ,
    timer) {
    
    
    video.volume = 0.1
    let duration
    let fullscreenBool = false
    let clicked = 0


    play.addEventListener('click', (e) => {
        if (video.paused) {
            play.textContent = '||'
            const variablePlay= getComputedStyle(document.documentElement).getPropertyValue('--pause-btn')
            play.style.webkitMaskImage=variablePlay
            video.play()
        } else {
            
            const variablePlay = getComputedStyle(document.documentElement).getPropertyValue('--play-btn')
            play.style.webkitMaskImage=variablePlay
            play.textContent = '>'
            video.pause()
        }
    })
    video.addEventListener('loadeddata', (event) => {
        video.play()
        volumeControl.value=video.volume
        duration = event.target.duration
        barra.style.backgroundSize = 0
        resetSoundIcon(volumeControl)
    })
    video.addEventListener('timeupdate', (event) => {
        const percentage = (event.target.currentTime / event.target.duration) * 100
        barra.value = percentage
        barra.style.backgroundSize = percentage + '%'
        const minutos = Math.trunc(video.currentTime/60)
        const segundos = Math.trunc(video.currentTime%60)
        timer.textContent=minutos+':'+ (segundos<=9?'0':'')+segundos
    })
    barra.oninput = (e) => {
        video.currentTime = (duration / 100) * e.target.value
        barra.style.backgroundSize = (video.currentTime / duration) * 100 + '%'
    }
    volumeControl.oninput=(e)=>{
        video.volume=volumeControl.value
        resetSoundIcon(volumeControl)
    }

    full.onclick = () => {
        if (!fullscreenBool){
            const isMobile = navigator.userAgentData.mobile;
            
            isMobile && screen.orientation.lock("landscape")
            full.style.webkitMaskImage="url('./static/svg/GridiconsFullscreenExit.svg')"
            video_container.requestFullscreen()
        }
        if (fullscreenBool) {
            full.style.webkitMaskImage=""
            document.exitFullscreen()
        }
        fullscreenBool = !fullscreenBool
    }


    forwBtn.addEventListener('click',(e)=>{
        clicked++
        if(clicked>1){
            const numberTimes = parseInt(clicked/2)
            video.currentTime +=(10*numberTimes)
            forwBtn.style.opacity='.5'

        }
        setTimeout(()=>{
            clicked=0
            forwBtn.style.opacity='0'
        },500)
    })
    backBtn.onclick=()=>{
        clicked++
        if(clicked>1){
            const numberTimes = parseInt(clicked/2)
            video.currentTime -=(10*numberTimes)
            backBtn.style.opacity='.5'
        }
        setTimeout(()=>{
            clicked=0
            backBtn.style.opacity='0'
        },500)
    }

    video_controls.addEventListener('mousemove',(e)=>{
        video_controls.style.animation='none'
        setTimeout(()=>{
            video_controls.style=''
        },100)
    })
    video_controls.addEventListener('touchmove',(e)=>{
        video_controls.style.animation='none'
        setTimeout(()=>{
            video_controls.style=''
        },100)
    })
}

function resetSoundIcon(audio){
    // console.log(audio.value)
    if(audio.value ==0){
        document.documentElement.style.setProperty('--backgrund-sound--vid',"url('../static/svg/iconoir-sound-off.svg')")
    }else if(audio.value>=0.5){
        document.documentElement.style.setProperty('--backgrund-sound--vid',"url('../static/svg/iconoir-sound-high.svg')")
    }
    else{
        document.documentElement.style.setProperty('--backgrund-sound--vid',"url('../static/svg/iconoir-sound-low.svg')")
    }
}
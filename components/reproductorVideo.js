export default function reproductorVideo({ id, name, tumbnail, src, duration }) {
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
    const fullScreenBtn = document.createElement('button')
    const backBtn = document.createElement('button')
    const forwBtn = document.createElement('button')

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

    playBtn.textContent = '>'
    fullScreenBtn.textContent = 'Full'
    forwBtn.textContent = '10 >>'
    backBtn.textContent = '<< 10'

    video_controls.appendChild(playBtn)
    video_controls.appendChild(barraReproduccion)
    video_controls.appendChild(fullScreenBtn)

    video_container.appendChild(forwBtn)
    video_container.appendChild(backBtn)

    videosFunctionality(video,
        video_container,
        playBtn,
        barraReproduccion,
        fullScreenBtn,
        forwBtn,
        backBtn,
        video_controls
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
    video_controls ) {
    
    
    video.volume = 0.1
    let duration
    let fullscreenBool = false
    let clicked = 0


    play.addEventListener('click', (e) => {
        if (video.paused) {
            play.textContent = '||'
            video.play()
        } else {
            play.textContent = '>'
            video.pause()
        }
    })
    video.addEventListener('loadeddata', (event) => {
        duration = event.target.duration
        barra.style.backgroundSize = 0
    })
    video.addEventListener('timeupdate', (event) => {
        const percentage = (event.target.currentTime / event.target.duration) * 100
        barra.value = percentage
        barra.style.backgroundSize = percentage + '%'
    })
    barra.oninput = (e) => {
        video.currentTime = (duration / 100) * e.target.value
        barra.style.backgroundSize = (video.currentTime / duration) * 100 + '%'
    }
    full.onclick = () => {
        if (!fullscreenBool) video_container.requestFullscreen()
        if (fullscreenBool) document.exitFullscreen()
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
}
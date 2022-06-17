function Miniatura({id,img='',duration='duration',titulo='TITULO'}){

    const miniatura = document.createElement('div')
    const caratula = document.createElement('div')
    const imagen =  document.createElement('img')
    const duracion = document.createElement('p')
    const tituloMiniatura = document.createElement('p')
    

    miniatura.classList.add('un-video')
    caratula.classList.add('caratula')

    tituloMiniatura.textContent = titulo
    duracion.textContent = duration
    imagen.src=img

    caratula.appendChild(imagen)
    caratula.appendChild(duracion)

    miniatura.appendChild(caratula)
    miniatura.appendChild(tituloMiniatura)

    miniatura.addEventListener('click',(e)=>{
    window.location.hash = '/reproductor/'+id

    })

    // const content = miniatura.outerHTML
    return miniatura
}

export {
    Miniatura
}


// const a = document.createElement('a')
// console.log(a)
// console.log(a.outerHTML)
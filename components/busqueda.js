import redirectElementOnclick from "./redirect.js"

export default function busqueda(){
    const header = document.getElementById('netlifyRedirect').parentNode
    const containerBusqueda = document.createElement('div')
    const containerBusquedaResponse = document.createElement('div')
    const inputBusqueda = document.createElement('input')
    const btnx = document.createElement('button')

    inputBusqueda.type='text'
    btnx.textContent='x'

    containerBusqueda.classList.add('container-busqueda')
    containerBusquedaResponse.classList.add('container-busqueda-response')
    inputBusqueda.classList.add('input-busqueda')
    btnx.classList.add('input-busqueda-btnx')

    inputBusqueda.setAttribute('name','search')

    funcionality(containerBusquedaResponse,inputBusqueda,btnx)

    containerBusqueda.appendChild(inputBusqueda)
    containerBusqueda.appendChild(btnx)
    containerBusqueda.appendChild(containerBusquedaResponse)
    header.appendChild(containerBusqueda)
}

function funcionality(container,barra,btnx){
    btnx.onclick=(e)=>{
        container.style.display='none'
    }
    barra.onfocus=(e)=>{
        container.style.display='block'

    }
    barra.onfocusout=(e)=>{
        container.style.display='none'
    }
    barra.onkeydown=(e)=>{
        container.innerHTML=''
        const name = e.target.value
        fetch('./assets/assets/videos.json')
        .then(data => data.json())
        .then(data=>{
            const music = data.musics.all.filter((el,i)=>{
                el.idArray=i
                return  el.name.toLowerCase().indexOf(name.toLowerCase())!=-1
            })
            const responseMusic = busquedaRecomendations(music,'music')
            responseMusic && container.appendChild(responseMusic)

            const video = data.videos.all.filter((el,i)=>{
                el.idArray=i
                return  el.name.toLowerCase().indexOf(name.toLowerCase())!=-1
            })
            const responseVideo = busquedaRecomendations(video,'reproductor')
            responseVideo && container.appendChild(responseVideo)
        })
    }

}

function busquedaRecomendations(data,type){
    let arrayData = data
    if(!data[0]) return''

    const container = document.createElement('div')

    if(data.length>3) arrayData = data.slice(0,2)
    arrayData.forEach(el=>{
        const p = document.createElement('p')
        p.textContent = el.name
        p.classList.add('one-search')
        p.onclick=(e)=>{
            window.location.hash='/'+type+'/'+el.id
            // console.log(p.parentNode.parentNode.parentNode.childNodes)
            p.parentNode.parentNode.parentNode.childNodes.item(0).value=''
            p.parentNode.parentNode.innerHTML = ''
        }
        container.appendChild(p)
    })
    return container
}
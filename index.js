import important from './helpers/importantsFunctionalities.js'
import home from './pages/home.js'
import musicReproductor from './pages/music.js'
import reproductor from './pages/reproductor.js'
const app = document.getElementById('app')

const appReset = (app,callback,id='')=>{
    app.innerHTML=''
    app.appendChild(callback(id))
}

const routes = {
    '':()=>appReset(app,home),
    '404':()=>app.innerHTML='<h1>404<h1/>',
    'reproductor':(id)=>appReset(app,reproductor,id),
    'music':(id)=>appReset(app,musicReproductor,id)
}

function router(e){
    e.preventDefault()

    // corregir esta logica por dio
    const decicion = resetHashUrl(window.location.hash)
    if(decicion.success) return routes[decicion.path](decicion.id)
    // corregir esta logica por dio

    routes[window.location.hash]? routes[window.location.hash]() : routes['404']()
}

function resetHashUrl(string){
    const array = string.split('/')
    // console.log(array)
    if(array[1]=='reproductor') return{
        success:true,
        path:array[1],
        id:array[2]
    }
    if(array[1]=='music')return{
        success:true,
        path:array[1],
        id:array[2]
    }
    return{

    }
}

important()

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

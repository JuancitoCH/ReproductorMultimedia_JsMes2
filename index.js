import home from './pages/home.js'
const app = document.getElementById('app')

const routes = {
    '':()=>app.appendChild(home()),
    '404':()=>app.innerHTML='<h1>404<h1/>'
}

function router(e){
    e.preventDefault()
    routes[window.location.hash]? routes[window.location.hash]() : routes['404']()
}

// function resetHashUrl(string)

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

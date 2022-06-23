export default function homeWelcome(){
    const sectiontWelcome = document.createElement('section')
    sectiontWelcome.classList.add('welcome-container')
    sectiontWelcome.innerHTML=`
    <h1 >Bienvenido a Netlify</h1>
    <p >La mejor app para reproducir videos y tus canciones favoritas</p>
    <img src="./static/svg/undraw_home_cinema_l7yl.svg" alt="">
    `
    return sectiontWelcome
}
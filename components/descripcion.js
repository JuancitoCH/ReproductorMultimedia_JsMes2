export default function descripcionVideo({name,duration,description}){
    const mainContainer = document.createElement('section')
    const title = document.createElement('h2')
    // const title = document.createElement('h2')
    const descript = document.createElement('p')

    title.textContent=name
    descript.textContent=description

    mainContainer.classList.add('reproductor-description-main-container')
    title.classList.add('reproductor-description-title')
    descript.classList.add('reproductor-description-p')

    mainContainer.appendChild(title)
    mainContainer.appendChild(descript)
    return mainContainer
}
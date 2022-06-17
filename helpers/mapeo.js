export default function mapeo(father,arrayData,callback){
    arrayData.forEach(data=> {
        const son = callback(data)
        father.appendChild(son)
    })
}

// export default function mapeo(preArrayHtml,callback){
//     // preArray es una lista de objetos
//     // callback es el procesamiento de la imformacion a strig Html
//     let string=''
//     const arrayHtml = preArrayHtml.map(peli=>callback(peli))
//     // aqui unimos a un string porque sino aparecen las comas
//     arrayHtml.forEach(html=>string+=html)
//     return string
// }
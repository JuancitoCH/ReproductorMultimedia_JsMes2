export default function redirectElementOnclick(element,url=''){
    element.addEventListener('click',(e)=>{
        window.location.hash=url
    })
}
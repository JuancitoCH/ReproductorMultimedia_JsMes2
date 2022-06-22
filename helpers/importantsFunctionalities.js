import redirect from '../components/redirect.js'

export default function important(){
    const headerLink = document.getElementById('netlifyRedirect')
    redirect(headerLink)
}
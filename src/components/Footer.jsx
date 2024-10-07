import('./../assets/css/footer.css')
import { useContext } from 'react'
import {GlobalContext} from "./../GlobalProvider"

const Footer = () => {
    const {showFooter} = useContext(GlobalContext)
    
    return (
        <section className={`footer border-t border-teal-300 py-4 px-4 flex justify-center ${!showFooter && "hidden"}`}>
            <div id="footer" className='flex justify-between items-center text-center w-full'>
                <p className="text-sm">No Rights Reserved ©TrayAgain</p>
                <small className="text-xs">Created by: Dyon Enedi</small>
            </div>
        </section>
    )
}

export default Footer
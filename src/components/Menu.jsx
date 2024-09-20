import {Link} from 'react-router-dom'
import {useModal} from './ModalContext'

import './../assets/css/menu.css'

const Menu = () => {
    const { openModal } = useModal()
    const handleModal = (e) => {
        e.preventDefault();
        openModal("Login");
    }

    return (
        <section className='menu border-b border-teal-300'>
          <div className="flex items-center justify-between h-full w-full">
            <Link to={'/'} className="flex items-center justify-center ml-8">
              <span className="ff-text text-xl text-neon uppercase">Try Again</span>
            </Link>

            <Link to={'#'} className='flex items-center justify-center mr-8' onClick={handleModal}>
                <span className='btn btn-main'>Login</span>
            </Link>
          </div>
        </section>
    )
}

export default Menu
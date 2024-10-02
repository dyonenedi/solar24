import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { ModalState} from './Modal'
import LoginForm from './LoginForm'

const Menu = () => {
  useEffect(() => {
    import('./../assets/css/menu.css')
  }, [])

  const { openModal } = ModalState();

  return (
    <section className='menu border-b border-teal-300'>
      <div className="flex items-center justify-between h-full w-full">
        <Link to={'/'} className="flex items-center justify-center ml-8">
          <span className="ff-text text-xl text-neon uppercase">Try Again</span>
        </Link>

        <Link to={'#'} className='flex items-center justify-center mr-8' onClick={(e) => openModal(e, 'modal-login')}>
          <span className='btn btn-main'>Login</span>
        </Link>
      </div>

      <LoginForm />
    </section>
  )
}

export default Menu
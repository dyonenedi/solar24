import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { ModalComponent, ModalState} from './Modal'

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

      <ModalComponent id={`modal-login`}>
        <form className='flex flex-col gap-2'>
          <div>
            <label>Usuário</label>
            <input type="text"></input>
          </div>
          <div>
            <label>Senha</label>
            <input type="password"></input>
          </div>
        </form>
      </ModalComponent>
    </section>
  )
}

export default Menu
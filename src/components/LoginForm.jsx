import { ModalComponent } from "./Modal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function LoginForm(){
    return (
        <ModalComponent id={`modal-login`}>
            <form className='flex flex-col justify-start gap-2 p-5'>
                <h1 className="text-2xl pb-2">Login</h1>
                <div className='flex items-center'>
                    <input type="text" name='user' placeholder="Usuário"autoComplete="false" required></input>
                    <FontAwesomeIcon icon="user" className="icon"/>
                </div>

                <div className='flex items-center'>
                    <input type="password" name='password' placeholder="Senha" autoComplete="false" required></input>
                    <FontAwesomeIcon icon="lock" className="-ml-8"/>
                </div>
            </form>
        </ModalComponent>
    )
}
import { useContext } from 'react'
import {GlobalContext} from './../GlobalProvider'
import {Oval} from 'react-loader-spinner'

export default function Loader(){
    const {loader} = useContext(GlobalContext)

    return (
        <section className={`absolute w-screen h-screen top-0 left-0 ${loader? '': 'hidden'}`}>
            <div className="absolute z-40 w-screen h-screen bg-black bg-opacity-80">
            
            </div>
            <div className='relative z-50 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-20'>
                <Oval />
            </div>
        </section>
    )
}
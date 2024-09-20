import { ModalProvider, useModal } from './components/ModalContext'
import Home from './pages/Home'
import Account from './pages/Account'
import Modal from './components/Modal'
import Footer from './components/Footer'
import Menu from './components/Menu'

import { library, text } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const AppContent = () => {
  const { openModal, modalState } = useModal()

  return (
    <Router className='flex flex-col'>
      <div className={`APP${modalState.show ? " blur" : ""} tv-noise`}>
        <Menu />
        <section className='game-content'>
          <Routes>
            <Route exact path="/" element={<Home openModalCallback={(text) => openModal(text)} />} />
            <Route path="/about" element={<Account />} />
          </Routes>
        </section>
       <Footer />
      </div>
      <Modal id="login" />
      <Modal id="home" />
    </Router>
  )
}

export default function App() {
  return (
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  );
}

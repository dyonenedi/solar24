import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {GlobalProvider, GlobalContext} from './GlobalProvider'

import Home from './pages/Home'
import Account from './pages/Account'
import Footer from './components/Footer'
import Menu from './components/Menu'

import { library, text } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)


const AppContent = () => {
  const {GModalOpened} = useContext(GlobalContext)

  return (
    <Router className='flex flex-col'>
      <div className={`APP tv-noise`}>
        <Menu />
        <section className='game-content'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<Account />} />
          </Routes>
        </section>
       <Footer />
      </div>
    </Router>
  )
}

export default function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  )
}

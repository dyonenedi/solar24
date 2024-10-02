import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {GlobalProvider, GlobalContext} from './GlobalProvider'

import Home from './pages/Home'
import Account from './pages/Account'
import Play from './pages/Play'
import Footer from './components/Footer'
import Menu from './components/Menu'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Loader from './components/Loader';
library.add(fas, far, fab)

const AppContent = () => {
  const {setLoader} = useContext(GlobalContext) // Global vars
  
  useEffect(() => {
    window.onload = setLoader(false)
  }, [])
  
  return (
    <Router className='flex tv-noise'>
      <div className={`app`}>
        <Loader />
        <Menu />
        <section className='game-content'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<Account />} />
            <Route path="/play" element={<Play />} />
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

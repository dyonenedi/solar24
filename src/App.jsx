import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { GlobalProvider, GlobalContext } from './GlobalProvider'
import SmallTooltip from 'small-tooltip';
import 'small-tooltip/smallTooltip.css'; 

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

const setGlobalWidthScreen = () => {
  const wRef = 400
  const hRef = 200
  const hMenu = 70

  // Ajust new rectangle area less menu
  let hGame = window.innerHeight - hMenu
  // Improve calcs by changing to pair
  hGame = makeEvenAfterFirst(hGame)
  // Get equivalent height by width 
  let wGame = hGame * wRef / hRef

  // Validate it's gona fit in screen
  if (wGame > window.innerWidth) {
    wGame = hGame * wRef / hRef
    hGame = (window.innerWidth * hRef / wRef) - hMenu
  }

  window.GAME_W = wGame
  window.GAME_H = hGame
}

const makeEvenAfterFirst = (number) => {
  // Converte para array de caracteres
  let digits = number.toString().split('')

  // Percorre a partir do segundo dígito
  for (let i = 1; i < digits.length; i++) {
    // Se o dígito não for par, substitui por '0'
    if (parseInt(digits[i]) % 2 !== 0) {
      digits[i] = '0'
    }
  }

  // Converte o array para um número
  return parseInt(digits.join(''))
}

setGlobalWidthScreen();

const AppContent = () => {
  const smallTooltip = new SmallTooltip();
  smallTooltip.init();

  const { setLoader } = useContext(GlobalContext)

  useEffect(() => {
    setWidthScreen();
  }, [])

  useEffect(() => {
    setLoader(false)
  })

  function setWidthScreen(){
    const Menu = document.getElementById('menu');
    const Footer = document.getElementById('footer');
    const Game = document.getElementById('game-content');
    Menu.style.width = GAME_W + "px";
    Footer.style.width = GAME_W + "px";
    Game.style.width = GAME_W + "px";
  }

  return (
    <Router className='flex tv-noise'>
      <div className={`app`}>
        <div id="small-tooltip"></div>
        <Loader />
        <Menu />
        <section id="game-content" className='game-content m-auto block relative'>
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

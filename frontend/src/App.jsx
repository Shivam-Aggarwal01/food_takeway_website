import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Mobile_APP from './pages/Mobile_APP'
import Contacts from './pages/Contacts'
import Footer from './components/Footer'
import { useState } from 'react'
import LoginPop from './components/LoginPop'
import Cart from './pages/Cart'
import UserOrders from './pages/UserOrders'

const App = () => {
    const [showLogin,setShowLogin] = useState(false)
  return (
    <div>
      {showLogin && <LoginPop ShowLogin={showLogin} setShowLogin={setShowLogin} />}

      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/mobile-app" element={<Mobile_APP />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/orders" element={<UserOrders />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
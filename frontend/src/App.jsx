import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Mobile_APP from './pages/Mobile_APP'
import Contacts from './pages/Contacts'
import Footer from './components/Footer'
import LoginPop from './components/LoginPop'
import Cart from './pages/Cart'
import UserOrders from './pages/UserOrders'

const App = () => {
    const [showLogin,setShowLogin] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setShowLogin={setShowLogin} />
      <LoginPop ShowLogin={showLogin} setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} />
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
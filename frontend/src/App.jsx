import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Mobile_APP from './pages/Mobile_APP'
import Contacts from './pages/Contacts'
import Footer from './components/Footer'
import LoginPop from './components/LoginPop'
import AdminLoginPop from './components/AdminLoginPop'
import Cart from './pages/Cart'
import UserOrders from './pages/UserOrders'

const App = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem("adminToken"));
    const navigate = useNavigate();

    // Check for existing admin login on component mount
    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        if (adminToken) {
            setIsAdminLoggedIn(true);
        }
    }, []);

    const handleAdminLoginSuccess = (token, admin) => {
        setIsAdminLoggedIn(true);
        // Redirect to admin panel
        window.open('http://localhost:5174', '_blank'); // Assuming admin runs on port 5174
    };

    const handleAdminLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        setIsAdminLoggedIn(false);
    };

    return (
        <div>
            <Navbar 
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn} 
                setShowLogin={setShowLogin}
                setShowAdminLogin={setShowAdminLogin}
                isAdminLoggedIn={isAdminLoggedIn}
                onAdminLogout={handleAdminLogout}
            />
            <LoginPop ShowLogin={showLogin} setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} />
            <AdminLoginPop 
                showAdminLogin={showAdminLogin} 
                setShowAdminLogin={setShowAdminLogin} 
                onAdminLoginSuccess={handleAdminLoginSuccess}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/mobile-app" element={<Mobile_APP />} />
                <Route path="/contact" element={<Contacts />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<UserOrders />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App
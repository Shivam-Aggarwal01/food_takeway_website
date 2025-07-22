import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import Orders from './pages/Orders';
import Remove from './pages/remove';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      <div className="flex-1">
        <Navbar toggleSidebar={() => setSidebarOpen(o => !o)} />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Add />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/remove-items" element={<Remove />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;

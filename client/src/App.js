import React  from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import CheckAdmin from './components/CheckAdmin/CheckAdmin';



const App = () => ( 
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" exact element={<Auth />} />
            <Route path="/checkAdmin" exact element={<CheckAdmin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
 )

export default App;

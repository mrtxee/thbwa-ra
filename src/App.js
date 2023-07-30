import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import About from "./pages/About";
import Devices from "./pages/Devices";
import Faq from "./pages/Faq";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import Test from "./pages/Test";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <main className="flex-shrink-0 mt-0 mb-4 p-0">
                <div className="container">
                    <Routes>
                        <Route path="/devices" element={<Devices/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/faq" element={<Faq/>}/>
                        <Route path="/test" element={<Test/>}/>
                    </Routes>
                </div>
            </main>
            {/*<Footer />*/}
        </BrowserRouter>
    );
}

export default App;

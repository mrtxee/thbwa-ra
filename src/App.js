import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import About from "./pages/About";
import Devices from "./pages/Devices";
import Faq from "./pages/Faq";
import tuya_image from "./assets/tuya_image.png"
import HeaderThemeSwitcher from "./components/ui/HeaderThemeSwitcher";
import Footer from "./pages/Footer";
import Header from "./pages/Header";

function App() {
    return (<BrowserRouter key={"root"}>
            <Header/>

            <main className="flex-shrink-0 mt-0 mb-4 p-0">
                <div className="container">
                    <Routes>
                        <Route path="/devices" element={<Devices/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/faq" element={<Faq/>}/>
                    </Routes>
                </div>
            </main>

            <Footer />
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Devices from "./pages/Devices";
import Faq from "./pages/Faq";
import Header from "./pages/Header";
import Test from "./pages/Test";
import Test2 from "./pages/Test2";

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
                        <Route path="/test2" element={<Test2/>}/>
                    </Routes>
                </div>
            </main>
            {/*<Footer />*/}
        </BrowserRouter>
    );
}

export default App;

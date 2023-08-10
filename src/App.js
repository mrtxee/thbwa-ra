import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Devices from "./pages/Devices";
import Faq from "./pages/Faq";
import Header from "./components/ui/Header/Header";
import CompentensDev from "./pages/dev/CompentensDev";
import Extra from "./pages/dev/Extra";
import ToastCt, {toast_error, toast_warning} from "./components/ui/ToastCt";
import axios from "axios";
import PostServiceV2 from "./api/PostServiceV2";

function App() {
    const BACKEND_BASE_URL = 'http://127.0.0.1:8000';
    const [userdata, setUserdata] = useState([]);
    const fetchUserData = () => {
        PostServiceV2.fetchUserData(
            (err) => toast_error(err),
            (res) => setUserdata(res.data)
        )
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    /* todo: подключить
    *   + сделать состояние unserdata
    *   + обновлять состояние unserdata по токену при страрте, если есть токен
    *   - если unserdata не пустое, то изменить кнопку signin
    * */

    return (
        <BrowserRouter>
            <Header/>
            <main className="flex-shrink-0 mt-0 mb-4 p-0">
                <div className="container">
                    <Routes>
                        <Route path="/devices" element={<Devices/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/faq" element={<Faq/>}/>
                        <Route path="/dev1" element={<CompentensDev
                            fetchUserDataCallback={fetchUserData}
                            userdata={userdata}
                        />}/>
                        <Route path="/dev2" element={<Extra/>}/>
                    </Routes>
                </div>
            </main>
            <ToastCt/>
            {/*<Footer />*/}
        </BrowserRouter>
    );
}

export default App;

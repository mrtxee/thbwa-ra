import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Devices from "./pages/Devices";
import Faq from "./pages/Faq";
import Header from "./components/ui/Header/Header";
import CompentensDev from "./pages/dev/CompentensDev";
import Extra from "./pages/dev/Extra";
import ToastCt, {toast_error} from "./components/ui/ToastCt";
import axios from "axios";

function App() {
    const BACKEND_BASE_URL = 'http://127.0.0.1:8000';
    const [userdata, setUserdata] = useState([]);
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        console.log('fetchUserData');
        if (localStorage.getItem("token") === null) {
            console.log('no token provided in localStorage')
            return;
        }
        console.log('getting userdata with ' + localStorage.getItem("token"))
        const userdata1 = await axios.get(
            `${BACKEND_BASE_URL}/api/v2.0/auth/login/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
            }).catch(
            function (error) {
                if (error.response.status === 403 || error.response.status === 401) {
                    toast_error(`bad credentials`);
                } else throw error;
            }
        ).then((resp) => {
            //console.log(response);
            if (resp.status !== 200) {
                console.log(resp);
                toast_error(`error`);
                return;
            }
            const newUserdata = resp.data
            setUserdata(newUserdata);
        });
    };

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

import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Devices from "../pages/Devices";
import About from "../pages/About";
import Faq from "../pages/Faq";
import SignIn from "../pages/auth/SignIn";
import UnitsDev from "../pages/dev/UnitsDev";
import Extra from "../pages/dev/Extra";
import {UserContext} from "../context";
import SignUp from "../pages/auth/SignUp";
import PasswordSend from "../pages/auth/PasswordSend";
import PasswordChange from "../pages/auth/PasswordChange";
import Profile from "../pages/auth/Profile";
import UpdateProfile from "../pages/auth/UpdateProfile";

const RoutesSchema = ({getUserDataByToken}) => {
    const {loginData} = useContext(UserContext);

    return (
        <Routes>
            <Route path="/devices" element=
                {loginData ?
                    <Devices/> :
                    <Navigate to="/signin"/>
                }
            />
            <Route path="/about" element={<About/>}/>
            <Route path="/faq" element={<Faq/>}/>
            <Route path="/signin" element=
                {loginData ? <Navigate to="/devices"/> : <SignIn/>}
            />
            <Route path="/signup" element=
                {loginData ? <Navigate to="/user/profile"/> : <SignUp/>}
            />
            <Route path="/sendpass" element=
                {loginData ? <Navigate to="/user/profile"/> : <PasswordSend/>}
            />
            <Route path="/user/changepass" element={loginData ? <PasswordChange/> : <About/>}/>
            <Route path="/user/profile" element={loginData ? <Profile/> : <About/>}/>
            <Route path="/user/profile/update" element={loginData ? <UpdateProfile/> : <About/>}/>
            <Route path="/dev1" element={<UnitsDev
                getUserDataCallback={getUserDataByToken}
            />}/>
            <Route path="/dev2" element={<Extra/>}/>
            <Route path="*" element={<About/>}/>
        </Routes>
    );
};

export default RoutesSchema;
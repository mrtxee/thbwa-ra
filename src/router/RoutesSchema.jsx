import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Devices from "../pages/Devices";
import About from "../pages/About";
import Faq from "../pages/Faq";
import SignIn from "../pages/auth/SignIn";
import UnitsDev from "../pages/dev/UnitsDev";
import {UserContext} from "../context";
import SignUp from "../pages/auth/SignUp";
import PasswordReset_Step1 from "../pages/auth/PasswordReset_Step1";
import PasswordChange from "../pages/user/PasswordChange";
import Profile from "../pages/user/Profile";
import UpdateProfile from "../pages/user/UpdateProfile";
import PasswordReset_Step2 from "../pages/auth/PasswordReset_Step2";

//{/*<Route path="/favicon.ico" element={require('/src/assets/favicon.ico')}/>*/}

const RoutesSchema = () => {
    const {loginData} = useContext(UserContext);

    return (<Routes>
            <Route path="/devices" element=
                {loginData ? <Devices/> : <Navigate to="/signin"/>}
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
                {loginData ? <Navigate to="/user/profile"/> : <PasswordReset_Step1/>}
            />
            <Route path="/user/changepass" element={loginData ? <PasswordChange/> : <About/>}/>
            <Route path="/user/profile" element={loginData ? <Profile/> : <About/>}/>
            <Route path="/user/profile/update" element={loginData ? <UpdateProfile/> : <About/>}/>
            <Route path="/resetpass/:key/"
                   element={loginData ? <Devices/> : <PasswordReset_Step2/>}
            />
            <Route path="/dev1" element={<UnitsDev/>}/>
            <Route path="*"  element=
                {loginData ? <Navigate to="/devices"/> : <About/>}
            />
        </Routes>);
};

export default RoutesSchema;
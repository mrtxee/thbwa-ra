import About from "../pages/About";
import Devices from "../pages/Devices";
import Faq from "../pages/Faq";
import SignIn from "../pages/auth/SignIn";
import UnitsDev from "../pages/dev/UnitsDev";
import Extra from "../pages/dev/Extra";

export const routes = [
    {path: '/about', component: About, exact: true},
    {path: '/devices', component: Devices, exact: true},
    {path: '/faq', component: Faq, exact: true},
    {path: '/signin', component: SignIn, exact: true},
    {path: '/dev1', component: UnitsDev, exact: true},
    {path: '/dev2', component: Extra, exact: true},
]
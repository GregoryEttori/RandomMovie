import Home from "@/views/Home";
import Signup from "@/views/Signup";
import Profile from "@/views/Profile";
import Login from "@/views/Login";
import ResetPassword from "@/views/ResetPassword";
import NewPassword from "@/views/NewPassword";


export const routes = [
    {path: "/", name: "Home", component: Home},
    {path: "/login", name:"Login", component: Login},
    {path: "/signup", name:"Signup", component: Signup},
    {path: "/profile", name:"Profile", component: Profile},
    {path: "/reset", name:"ResetPassword", component: ResetPassword,},
    {path: "/reset/:token", name:"NewPassword", component: NewPassword},
    {path: "*", redirect: "/" }
]
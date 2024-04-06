
import { createBrowserRouter } from "react-router-dom";
import Login from "./views/login.jsx";
import Register from "./views/register.jsx";
import Defualt from "./Components/Defualt.jsx";
import GuestLayout from "./Components/GuestLayout.jsx";
import Users from "./views/users.jsx";
import UserForm from "./views/UserForm.jsx";
const router=createBrowserRouter([


{
    path:"/",
    element:<Defualt/>,
    children:[
        {
            path:"/users",
            element:<Users/>
        },
        {
            path:"/users/new",
            element:<UserForm key="UserCreate"/>
        },
        {
            path:"/users/:id",
            element:<UserForm key="UserUpdate"/>
        },
    ]
},

{
    path:"/",
    element:<GuestLayout/>,
    children:[
        {
            path:"/login",
            element:<Login />
        },{
        path:"/register",
        element:<Register />
        },
    ]
}
]);
export default router;
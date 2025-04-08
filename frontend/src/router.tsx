import {createBrowserRouter, Navigate} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import MainPage from "./pages/mainPage/MainPage.tsx";
import PostFormPage from "./pages/formPages/PostFormPage.tsx";

const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout/>,
        children:[
            {
                index: true,
                element: <Navigate to={'main'}/>
            },
            {
                path: 'main',
                element: <MainPage/>
            },
            {
                path: 'create_post',
                element: <PostFormPage/>
            }
        ]
    }
])

export default router;
import Header from "../components/header/Header.tsx";
import {Outlet} from "react-router-dom";
import './mainLayoutStyles.scss'

const MainLayout = () => {
    return (
        <div className='Main-layout'>
            <Header/>
            <div className='Content-container'>
                <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;
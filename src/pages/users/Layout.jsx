import React, { useEffect } from "react";
import {Outlet, useNavigate} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";



const Layout =()=>{
    
    return (
        <>
        <div>
            
            <Header/>
            <div className="content-wrapper" >{<Outlet/>}</div>
            <Footer/>
        </div>
        </>
    );
};

export default Layout;
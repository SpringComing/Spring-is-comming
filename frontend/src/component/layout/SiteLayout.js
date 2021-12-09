import React from 'react';
import Logo from "./Logo";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./Footer"

export default function SiteLayout({children}) {
    return (
            <div className="spring-wrapper">
                <div className="spring">
                    <Logo />
                    <Header />
                    <Sidebar />
                    {children}
                    <Footer/>
                </div>
            </div>
    );
}
import React from "react";
import { connect } from "react-redux";
import { Outlet }  from "react-router-dom"
import "./sass/style.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { SectionAd } from "./advertisement/section-ad-component";
import { SiteFeatures } from "./common/site-features-component";
import { Footer } from "./footer/footer-component";
import { HeaderMiddle } from "./header/header-middle-component";
import { HeaderTop } from "./header/header-top-component";
import { MainNavbar } from "./header/main-navbar-component";
import { ToastContainer } from "react-toastify";



class HomeLayoutComponent extends React.Component{
    
    constructor(props) {
        super(props)
        this.state = {
            is_loading: true,
            username: '',
            data: ''
        }
    }

    render() {
    
        return (
            <>
                <ToastContainer></ToastContainer>
                <HeaderTop></HeaderTop>
                <HeaderMiddle></HeaderMiddle>
                <MainNavbar></MainNavbar>
                
                <Outlet></Outlet>
                
                <SectionAd></SectionAd>
                <SiteFeatures></SiteFeatures>
                <Footer></Footer>
            </>
        );
    }
}
const mapStateToProps = (rootStore) => ({
    user: rootStore.user.user
})
const mapDispatchToProps = {};
export const HomeLayout = connect(mapStateToProps, mapDispatchToProps)(HomeLayoutComponent);
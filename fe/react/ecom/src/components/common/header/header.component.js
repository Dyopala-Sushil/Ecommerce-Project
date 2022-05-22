import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
export class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <header>
                <ToastContainer></ToastContainer>
                <ul className="nav">
                    <li className="nav-link">
                        <NavLink className={({isActive}) => "test"}   to="/">Home</NavLink >
                    </li>
                    <li className="nav-link">
                        <NavLink  to="/about">About</NavLink >
                    </li>
                    <li className="nav-link">
                        <NavLink  to="/login">Login</NavLink >
                    </li>
                    <li className="nav-link">
                        <NavLink  to="/category/4">Category 4</NavLink >
                    </li>
                    <li className="nav-link">
                        <NavLink  to="/register">Register</NavLink >
                    </li>
                </ul>
            <ToastContainer></ToastContainer>

            </header>
        );
    }
}
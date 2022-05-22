import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../common/header/header.component";

import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { http } from "../../services/http.service";
import { connect }  from "react-redux"
import { login } from "../../actions/user.acts";

function LoginComponent(props){
    let [email, setEmail]  = useState('');
    let [password, setPassword]  = useState('');
    let [emailErr, setEmailErr] = useState();
    let [passwordErr, setPasswordErr] = useState();

    let navigate = useNavigate();

    // side effect  
    useEffect(()=>{
        if(!email){
            setEmailErr("Email is required");
        } else if(email && (!email.includes('@') || !email.includes('.com'))) {
            setEmailErr("Invalid Email Format")
        }
        else {
            setEmailErr("");
        }
    }, [email]);

    // password effect
    useEffect(()=>{
        if(!password){
            setPasswordErr("Password is required");
        } else if(password.length < 8) {
            setPasswordErr("Password must be 8 character long")
        }
        else {
            setPasswordErr("");
        }
    }, [password]);

    useEffect(() => {
        let is_logged_in = Boolean(localStorage.getItem('_token'));
        if(is_logged_in == true){
            let user = JSON.parse(localStorage.getItem('_user'));
            if(user.role == 'seller'){
                navigate('/seller')
            } else {
                navigate('/admin')
            }

        }
    }, [props]);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        props.loginFunction(email, password);
    }
    
    return (
        <>
            <hr/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h4 className="text-center">Login </h4>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <label className="col-sm-3">Username: </label>
                                <div className="col-sm-9">
                                    <input type="email" defaultValue={email || ''} onChange={(ev) => {
                                        setEmail(ev.target.value);
                                    }} name="email" placeholder="Enter your username"  className="form-control form-control-sm" />
                                    <span className="text-danger">{emailErr}</span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-3">Password: </label>
                                <div className="col-sm-9">
                                    <input type="password" onChange={(ev) => {
                                        setPassword(ev.target.value);
                                    }} name="password" placeholder="Enter your password"  className="form-control form-control-sm" />
                                    <span className="text-danger">{passwordErr}</span>
                                
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="offset-3 col-sm-9">
                                    <button type="submit" className="btn btn-sm btn-success">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (rootStore)=>({
    user:rootStore.user.user
})
const mapDispatchToProps = {
    loginFunction: login
};
export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
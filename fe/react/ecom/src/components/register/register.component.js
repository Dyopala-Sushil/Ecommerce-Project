import React from "react";
import { Header } from "../common/header/header.component";

import {http} from "../../services/http.service";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const commonFields = {
    name: '',
    email: '',
    password: '',
    temp_addr_ward_no: '',
    temp_addr: '',
    perm_addr_ward_no: '',
    perm_addr: '',
    role: '',
    phone: ''
}

class RegisterComponent extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: {
                ...commonFields
            },
            error: {
                ...commonFields
            },
            isDisabled: false
        }
    }


    handleSubmit = (ev) => {
        ev.preventDefault()

        for(let keys in commonFields){
            this.validateField(keys);
        }

        http.postItem('/users', this.state.data)
        .then((response) => {
            if(response.data.status == 200){
                toast.success(response.data.msg);
                
                this.props.navigate('/login')
            }
        }) 
        .catch((error) => {
            console.log("Error: ", error );
        })
    }

    handleChange = (ev) => {
        let {name, value, type} = ev.target;

        this.setState((preState) => (
            {
                data: {
                    ...preState.data,
                    [name]: value
                }
            }
        ), () => {
            this.validateField(name);
        })
    }

    validateField = fieldName => {
        const {data} =this.state;
        let errMsg = "";
        // console.log("Data: ",data);
        switch(fieldName){
            case "name":
                errMsg = (data['name'] == "") ? 'Name is required' : '';     
                break;
            case "email": 
                errMsg = (data['email'] == null) ? 'Email is required' : (
                        ((!data['email'].includes('@') || !data['email'].includes('.com')) ? 'Invalid Email format' : "")
                );       
                break
            case "password": 
                errMsg = (data['password'] == null) ? 'Password is required' : ((data['password'].length < 8) ? 'Password must be atleast 8 character' : '') ;     
                break;
            case "temp_addr_ward_no":
                let temp_ward_no = Number(data['temp_addr_ward_no']);
                errMsg = (temp_ward_no > 34 || temp_ward_no <= 0) ? 'Ward number must be greater than 0' : '';     
                break;
            case "perm_addr_ward_no": 
                let perm_ward_no = Number(data['perm_addr_ward_no']);
                errMsg = (perm_ward_no > 34 || perm_ward_no <= 0) ? 'Ward number must be greater than 0' : '';     
                break;
            case "role":
                errMsg = (data['role'] == 'customer' || data['role'] == 'seller') ? "" : "Invalid Role";
                break;
            default: 
                errMsg = null;
                break;
        }
        this.setState((prestate) => (
            {
                error: {
                    ...prestate.error,
                    [fieldName]: errMsg
                }
            }
        ), () => {
            let {error} = this.state;
            let counter = 0;
            for(let key in error){
                if(error[key]){
                    counter++
                }
            }
            if(counter){
                this.setState({
                    isDisabled: true
                })
            } else {
                this.setState({
                    isDisabled: false
                })
            }
        })
    }

    render(){
        const {error} = this.state;
        return (
            <>
                <ToastContainer></ToastContainer>
                
                <hr></hr>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="text-center">Register Your User</h4>
                            <hr />
                            <form onSubmit={this.handleSubmit}>
                                <div className="row mb-3">
                                    <label className="col-sm-3">Name: </label>
                                    <div className="col-sm-9">
                                        <input type="name" onChange={this.handleChange} name="name" placeholder="Enter your Name"  className="form-control form-control-sm" />
                                        <span className="text-danger">{error.name}</span>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3">Email: </label>
                                    <div className="col-sm-9">
                                        <input type="email" onChange={this.handleChange} name="email" placeholder="Enter your username"  className="form-control form-control-sm" />
                                        <span className="text-danger">{error.email}</span>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3">Password: </label>
                                    <div className="col-sm-9">
                                        <input type="password" onChange={this.handleChange} name="password" placeholder="Enter your password"  className="form-control form-control-sm" />
                                        <span className="text-danger">{error.password}</span>
                                    
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-3">Address(Temp): </label>
                                    <div className="col-sm-1">
                                        <input type="number" onChange={this.handleChange} name="temp_addr_ward_no" placeholder="Ward"  className="form-control form-control-sm" />
                                        <span className="text-danger">{error.temp_addr_ward_no}</span>
                                    </div>
                                    <div className="col-sm-8">
                                        <input type="text" onChange={this.handleChange} name="temp_addr" placeholder="Enter Address"  className="form-control form-control-sm" />
                                        <span className="text-danger">{error.temp_addr}</span>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="col-sm-3">Address(Perm): </label>
                                    <div className="col-sm-1">
                                        <input type="number" onChange={this.handleChange} name="perm_addr_ward_no" placeholder="Ward"  className="form-control form-control-sm" />
                                        <span className="text-danger">{error.perm_addr_ward_no}</span>
                                    </div>
                                    <div className="col-sm-8">
                                        <input type="text" onChange={this.handleChange} name="perm_addr" placeholder="Enter Address"  className="form-control form-control-sm" />
                                        <span className="text-danger">{error.perm_addr}</span>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-3">Role: </label>
                                    <div className="col-sm-9">
                                        <select name="role" onChange={this.handleChange} id="role" className="form-control form-control-sm">
                                            <option value="customer">Buyer</option>
                                            <option value="seller">Seller</option>
                                        </select>
                                        <span className="text-danger">{error.role}</span>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className="col-sm-3">Phone: </label>
                                    <div className="col-sm-9">
                                        <input type="tel" name="phone" onChange={this.handleChange} className="form-control form-control-sm" />
                                        <span className="text-danger">{error.phone}</span>
                                    </div>
                                </div>
                                

                                <div className="row mb-3">
                                    <div className="offset-3 col-sm-9">
                                        <button type="submit" disabled={this.state.isDisabled} className="btn btn-sm btn-success">
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


export function Register() {
    let navigate = useNavigate();

    return (
        <RegisterComponent navigate={navigate} />
    )
}
import { http } from "../services/http.service"
import {toast} from "react-toastify";

export const UserActionTypes = {
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN: "LOGIN"
}


export const loginOld = (email, password) => {
    return (dispatch) => {
        return dispatch({
            type: UserActionTypes.LOGIN,
            payload: {
                email: email,
                password: password
            }
        })
    }
}


export const login = (email, password) => dispatch => {
    
    http.postItem('/login', {
        "email": email,
        "password": password
    })
    .then((response) => {
        if(response.data.status){
            let user = {
                name: response.data.data.user.name,
                email: response.data.data.user.email,
                role: response.data.data.user.role
            };
            // console.log("User", user);
            localStorage.setItem('_token', response.data.data.token);
            localStorage.setItem('_user', JSON.stringify(user));
            toast.success('Welcome to admin panel!')
            
            if(response.data.data.user.role == 'seller'){
                return dispatch({
                    type: UserActionTypes.LOGIN,
                    payload: response.data.data.user
                })
            } else {
                return dispatch({
                    type: UserActionTypes.LOGIN,
                    payload: {}
                })
            }
            
        } else {
            toast.error("Credentials does not match");
            return dispatch({
                type: UserActionTypes.LOGIN,
                payload:{}
            })
        }
    })
    .catch((error) => {
        console.log("Error: ", error);
        return dispatch({
            type: UserActionTypes.LOGIN,
            payload: {}
        })
    })

    
    
}
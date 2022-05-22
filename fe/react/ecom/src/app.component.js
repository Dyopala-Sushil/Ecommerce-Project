import {BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom";

import { HomeLayout } from "./components/home/home-layout.component";
import { Home } from "./components/home/home.component";


import { Login } from "./components/login/login.component";
import { Register } from "./components/register/register.component";
import { AdminLayout, Category, Dashboard } from "./components/admin";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {SellerLayout, SellerDashboard} from "./components/seller/index";
import { CategoryList,CategoryCreate, CategoryEdit } from "./components/admin/category";
import { Product, ProductList, ProductAdd, ProductEdit } from "./components/admin/product";

import {Provider} from "react-redux";
import {store} from "./store";
import { SearchResult } from "./components/home/products/search-result.component";
import { ProductDetail } from "./components/home/products/product-detail-page"
import { Cart } from "./components/home/cart/cart-component";
import { http } from "./services/http.service";
function ErrorPage(){
    return (
        <>
            404 Not found
        </>
    );
}

function Logout(){
    localStorage.clear();
    //let [isLoading, setIsLoading] = useState(true);

    let navigate = useNavigate();

    useEffect(() => {
        // AXIOS: data, 
        // isLoading 
        //setIsLoading(false);
        navigate('/login');
    })

    return (
        <>
        </>
    );


}

function PrivateRoute({component: Component}){
    let is_logged_in = Boolean(localStorage.getItem('_token'));
    
    return is_logged_in === true ? Component : <Navigate to='/login'></Navigate>
}

function SellerRoute({component: Component}){
    let is_logged_in = Boolean(localStorage.getItem('_token'));
    
    if(is_logged_in){
        let user = JSON.parse(localStorage.getItem('_user'));
        if(user.role == 'seller'){
            return Component;
        } else {
            toast.warning('You do not have previlage to access this route.');
            return <Navigate to="/"></Navigate>
        }
    } else {
        return <Navigate to='/login'></Navigate>;
    }
}

function CustomerRoute({component: Component}){
    let is_logged_in = Boolean(localStorage.getItem('_token'));
    
    if(is_logged_in){
        let user = JSON.parse(localStorage.getItem('_user'));
        if(user.role == 'customer'){
            return Component;
        } else {
            toast.warning('You do not have previlage to access this route.');
            return <Navigate to="/"></Navigate>
        }
    } else {
        return <Navigate to='/login'></Navigate>;
    }
}

function Checkout(){
    let navigate = useNavigate();
    useEffect(() => {
        let cart_info = JSON.parse(localStorage.getItem('_cart'));
        http.postItem('/create-order', cart_info, true)
        .then((response) => {
           if(response.data.status){
                toast.success(response.data.msg);
                localStorage.removeItem('_cart');
                setTimeout(() => {
                    navigate("/");
                }, 2000)
           } else {
                toast.error(response.data.msg);
           }
        })
        .catch((error) => {
            console.log("Error: ", error)
        })
    }, [])
    return (<>
        Processing....
    </>)
}

export function App() {

    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomeLayout />}>
                            <Route index element={<Home></Home>}></Route>
                            <Route path="/login" element={<Login></Login>}></Route>
                            <Route path="/register" element={<Register></Register>}></Route>
                            <Route path="/search" element={<SearchResult />}></Route>
                            <Route path="/cart" element={<Cart />}></Route>
                            <Route path="/product/:id" element={<ProductDetail />}></Route>
                            <Route path="/checkout" element={<CustomerRoute component={<Checkout />}></CustomerRoute>}></Route>
                        </Route>


                        
                        
                        
                        <Route path="/admin" element={<PrivateRoute component={<AdminLayout />}></PrivateRoute>}>
                            <Route index element={<Dashboard />}></Route>
                            <Route path='category' element={<PrivateRoute component={<Category/>} />}>
                                <Route index element={<CategoryList />}></Route>
                                <Route path="create" element={<CategoryCreate />}></Route>
                                <Route path=":id" element={<CategoryEdit />}></Route>
                            </Route>
                            <Route path="product" element={<PrivateRoute component={<Product />} />}>
                                <Route index element={<ProductList />}></Route>
                                <Route path="create" element={<ProductAdd></ProductAdd>}></Route>
                                <Route path=":id" element={<ProductEdit />}></Route>
                            </Route>
                        </Route>

                        <Route path="/seller" element={<SellerRoute component={<SellerLayout />}></SellerRoute>}>
                            <Route index element={<SellerDashboard />}></Route>
                        </Route>

                        <Route path="/logout" element={<PrivateRoute component={<Logout />}></PrivateRoute>}></Route>

                        <Route path="/*" element={<ErrorPage></ErrorPage>}></Route>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>
    );
}

/***
 * 
 * Routes configure 
 * CMS  content 
 * 
 * 
 */
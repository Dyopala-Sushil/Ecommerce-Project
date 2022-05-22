import { Outlet } from "react-router-dom";
import "../../../template/css/sb-admin-2.min.css"
import { Sidebar } from "../../admin/sidebar/sidebar.component";
import {TopNav} from "../../admin/topnav/topnav.component";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
export function SellerLayout(props) {

    return (
        <>
            <ToastContainer />
            <div id="wrapper">

                <Sidebar></Sidebar>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <TopNav></TopNav>

                        <div className="container-fluid">

                            <Outlet />

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}
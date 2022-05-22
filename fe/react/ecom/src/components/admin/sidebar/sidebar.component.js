import { NavLink } from "react-router-dom";

export function Sidebar(){
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Admin Panel</div>
            </NavLink>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item">
                <NavLink className={({isActive}) => (isActive ? 'nav-link customactive' : 'nav-link')} to="/admin">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></NavLink>
            </li>

            <li className="nav-item">
                <NavLink  className={({isActive}) => (isActive ? 'nav-link customactive' : 'nav-link')} to="/admin/category">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Category</span></NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={({isActive}) => (isActive ? 'nav-link customactive' : 'nav-link')} to="/admin/product">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Product</span></NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={({isActive}) => (isActive ? 'nav-link customactive' : 'nav-link')} to="/admin/category">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Order</span></NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={({isActive}) => (isActive ? 'nav-link customactive' : 'nav-link')} to="/logout">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Logout</span></NavLink>
            </li>

            <hr className="sidebar-divider" />

        </ul>
    )
}
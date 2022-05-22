import React from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify"
class CategoryComponent extends React.Component {
    constructor(){
        super()
    }

    render(){
        // toast.success("Succs!!");
        // toast.info("Info!!");
        // toast.warning("Warning!!");
        // toast.error("Error!!");
        return (
            <>
                <Outlet />
            </>
        );
    }
}

export function Category(){
    return (
        <CategoryComponent />
    );
}
import { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom"
import DataTable from 'react-data-table-component';
import {ActionBtns} from "../common/action-btns.component"
import { http } from '../../../services/http.service';
import {toast} from "react-toastify"
export function ProductList() {
    const columns = [
        {
            name: 'Title',
            selector: row => row.title
        },
        {
            name: 'Category',
            selector: row => row.category?.name
        },
        {
            name: 'Price',
            selector: row => row?.after_discount || row?.price
        },
        {
            name: 'Discount',
            selector: row => row?.discount
        },
        {
            name: 'Status',
            selector: row => row?.status
        },
        {
            name: 'Actions',
            selector: row => <ActionBtns editUrl="/admin/product"
            id={row._id}
            onDelete={deleteProduct}></ActionBtns>
        },
    ];

    let [data, setData] = useState();
    let [isLoading, setIsLoading] =useState(true);
    
    useEffect(() => {
        http.getItem('/product', true)
        .then((response) => {
            if(response.data.status){

                let all_result = [];
                
                all_result = response.data.data.map((o) => o)

                // console.log(all_result);

                setData(all_result);
            }
            // console.log("Response:", response);
        })
        .catch((error) => {
            console.log("Error:", error);
        })
    }, [isLoading])

    const deleteProduct = (id) =>{
        http.deleteItem('/product/'+id, true)
        .then((response) => {
            if(response.data.status){
                toast.success("Product deleted successfully.")
                if(isLoading){
                    setIsLoading(false);
                } else {
                    setIsLoading(true);
                }
            } else {
                toast.error("Sorry! There was problem while deleting Product");
            }
        })
        .catch((error) => {
            console.log("Error: ", error);
        })
    }

    return (<>
        <h4>
            Product List
            <NavLink className="btn btn-sm btn-success float-right" to="/admin/product/create">
                Add product
            </NavLink>
        </h4>

        <hr />
        <DataTable
            columns={columns}
            data={data}
            pagination
            responsive
        />
    </>)
}
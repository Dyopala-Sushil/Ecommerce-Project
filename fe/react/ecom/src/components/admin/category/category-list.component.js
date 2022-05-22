import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {CategoryService} from "./category.service";
import { ActionBtns } from "../common/action-btns.component";
import { http } from "../../../services/http.service";
import {toast} from "react-toastify";

export function CategoryList(){
    let [allCats, setAllCats] = useState([]);
    let catSvc = new CategoryService();

    useEffect(() => {
        // Fetch data 
        // console.log("All Cats fetch");
        catSvc.getAllCats()
        .then((response) => {
            if(response.data.status == 200){
                // set state 
                setAllCats(response.data.result)
            }
        })
    },[]);

    const handleDelete = (id) => {
       //  console.log("Delet Id: ", id);
       http.deleteItem('/category/'+id, true)
       .then((response) => {
           // 
           if(response.data.status == 200){
               toast.success(response.data.msg);
               catSvc.getAllCats()
                .then((response) => {
                    if(response.data.status == 200){
                        // set state 
                        setAllCats(response.data.result)
                    }
                })
           }
       })
       .catch((error) => {

       })
    }

    // console.log("All Cats: ", allCats)
    return (
        <>
            <h4>
                Category
                <NavLink className="btn btn-sm btn-success float-right" to="/admin/category/create">
                    Add Category
                </NavLink>    
            </h4>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <table className="table table-sm table-bordered table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>S.N</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allCats.map((o, i) => (
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{o.name}</td>
                                            <td>{o.status}</td>
                                            <td>
                                                <ActionBtns 
                                                    editUrl="/admin/category"
                                                    id={o._id}
                                                    onDelete={handleDelete}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
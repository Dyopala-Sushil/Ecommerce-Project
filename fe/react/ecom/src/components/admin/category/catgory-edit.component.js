import { useEffect, useState } from "react";
import { CategoryForm } from "./category-form.component";

import { toast} from "react-toastify";

import { useNavigate, useParams } from "react-router-dom"
import { CategoryService } from "./category.service";


export function CategoryEdit(){

    let params = useParams();
    let svc = new CategoryService()
    let [category, setCategory] = useState({});
    let navigate = useNavigate()

    useEffect(() => {
        svc.getCategoryById(params.id)
        .then((response) => {
            if(response.data.status == 200 && response.data.result){
                
                setCategory(response.data.result);
            } else {
                toast.error("Category not found");
            }
        })
        .catch((error) => {
            console.log("Error: ", error);
        })
    }, []);

    const updateCategory = (data) => {

        let updated = {};
       
        for(let key in data){
            if(data[key]){
                updated[key] = data[key];
            }
        }

        svc.updateCategoryById(category._id, updated)
        .then((response) => {
            toast.success("Category updated successfully.");
        })
        .catch((error) => {
            toast.error("Category could not be updated.")
        })
        navigate('/admin/category');
    }
    return (
        <>
            <h1>Edit Category</h1>
            <hr />
            <CategoryForm 
                onSubmitEvent={updateCategory}
                category={category}
            />
        </>
    );
}
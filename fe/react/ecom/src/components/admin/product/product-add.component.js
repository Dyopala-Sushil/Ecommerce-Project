import {ProductForm} from "./product-form.component"
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import { http } from "../../../services/http.service";

export function ProductAdd() {
    let navigate = useNavigate();
    const productAdd = (data, files) => {
        http.uploadItem("POST",'product', data, files, true)
        .then((res) => {
            toast.success("Product added successfully.");
            navigate("/admin/product")
        })
        .catch((err) => {
            toast.error(err.msg);
        })
    
    }


    return (

        <>
            <h4>Product Add Form</h4>
            <hr />
            <ProductForm onSubmit={productAdd}></ProductForm>
        </>
    )
}
import {ProductForm} from "./product-form.component"
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { http } from "../../../services/http.service";

export function ProductEdit() {
    let navigate = useNavigate();
    let params = useParams();
    let [product, setProduct] = useState({});

    const productEdit = (data, files) => {
        
        let final_result = {};

        for(let key in data){
            if(data[key]){
                final_result[key] = data[key];
            }
        }

        final_result = {
            ...product,
            ...final_result
        }
        
        http.uploadItem('PUT', 'product/'+product._id, final_result, files, true)
        .then((res) => {
            if(res.status){
                toast.success(res.msg);
                navigate("/admin/product");
            } else {
                toast.error(res.msg);
            }
        })
        .catch((error) => {
            toast.error(error.msg);
        })
    }

    useEffect(() => {
        http.getItem('product/'+params.id, true)
        .then((res) => {
            if(res.data.result){
                setProduct(res.data.result);
            } else {
                toast.error(res.data.msg);
                navigate("/admin/product")
            }
        })
        .catch((err) => {
            toast.error(err.data.msg);
            navigate('/admin/product')
        })
    }, [])
    return (

        <>
            <h4>Product Add Form</h4>
            <hr />
            <ProductForm product={product} onSubmit={productEdit}></ProductForm>
        </>
    )
}
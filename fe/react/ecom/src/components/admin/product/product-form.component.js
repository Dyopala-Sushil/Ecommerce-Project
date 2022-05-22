import { useEffect, useState } from "react";
import { http } from "../../../services/http.service";

export function ProductForm(props) {

    let [product, setProduct] = useState({});
    let [allCats, setAllCats] = useState([]);

    let [data, setData] = useState({
        title: '',
        summary: '',
        description: '',
        price: 0,
        discount: 0,
        category: '',
        brand: '',
        status: ''
    });

    let [filestoUpload, setFilestoUpload] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(data, filestoUpload);
    }

    const handleChange = (e) => {
        let {name, value, files} = e.target;
        // Handle file
        if(files){
            let images = []
            Object.keys(files).map((key) => {
                images.push(files[key])
            });
            return setFilestoUpload(images);
        }
        
        // Except files  
        setData({
            ...data,
            [name]: value
        });
    } 

    useEffect(() => {
        http.getItem('/category')
        .then((response) => {
            if(response.data.status == 200){
                setAllCats(response.data.result)
            } else {
                //
                console.log("Caetegory is null");
            }
        })
        .catch((error)=> {
            console.log("Error>>>> ", JSON.stringify(error))
        })
    }, []);

    useEffect(() => {
        setProduct(props.product);
    }, [props])
    return (
        <>
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-12">

                    <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <label className="col-sm-3">Title: </label>
                            <div className="col-sm-9">
                                <input defaultValue={product?.title} type="text" name="title" required placeholder="Enter Product Name..." onChange={handleChange} className="form-control form-control-sm" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3">Summary: </label>
                            <div className="col-sm-9">
                                <textarea defaultValue={product?.description} rows={5} name="summary" placeholder="Enter Product Summary..." onChange={handleChange} className="form-control form-control-sm" style={{"resize": "none"}}></textarea>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3">Description: </label>
                            <div className="col-sm-9">
                                <textarea defaultValue={product?.description} rows={5} name="description" placeholder="Enter Product Summary..." onChange={handleChange} className="form-control form-control-sm" style={{"resize": "none"}}></textarea>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3">Price(In NPR.): </label>
                            <div className="col-sm-9">
                                <input defaultValue={product?.price} min={1} type="number" name="price" required placeholder="Enter Product Price..." onChange={handleChange} className="form-control form-control-sm" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3">Discount(In %): </label>
                            <div className="col-sm-9">
                                <input defaultValue={product?.discount} min={0} max={100} type="number" name="discount" required placeholder="Enter Product Discount..." onChange={handleChange} className="form-control form-control-sm" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3">Category: </label>
                            <div className="col-sm-9">
                                <select name="category" defaultValue={product?.category} onChange={handleChange} id="category" className="form-control form-control-sm">
                                    {
                                        allCats.map((o, i) => (
                                            <option key={i} value={o._id} selected={product && product.category == o._id ? true : false}>
                                                {o.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3">Brand: </label>
                            <div className="col-sm-9">
                                <input type="text" defaultValue={product?.brand} name="brand" onChange={handleChange} placeholder="Enter product brand" className="form-control form-control-sm" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3">Status: </label>
                            <div className="col-sm-9">
                                <select name="status"  onChange={handleChange} id="status" required className="form-control form-control-sm">
                                    <option value="active" selected={product ? (product.status == 'active' ? true : false) : false}>Active</option>
                                    <option value="inactive" selected={product ? (product.status == 'inactive' ? true : false) : false}>Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3">Image: </label>
                            <div className="col-sm-3">
                                <input type="file" onChange={handleChange} name="image" multiple />
                            </div>
                            <div className="col-sm-6">
                                <div className="row">
                                {
                                    product && product.images && product.images.map((o, i) => (
                                        <div key={i} className="col-sm-3 mb-1">
                                            <img src={process.env.REACT_APP_IMAGES_URL+o} alt="" className="img img-fluid" />
                                        </div>
                                    ))
                                }
                                {
                                    filestoUpload.map((o, i) => (
                                        <div key={i} className="col-sm-3">
                                            <img src={URL.createObjectURL(o)} alt="" className="img img-fluid" />
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-sm-3 col-sm-9">
                                <button className="btn btn-sm btn-danger mr-3" type="reset">
                                    Cancel
                                </button>
                                <button className="btn btn-sm btn-success" type="submit">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>

                    </div>
                </div>
            </div>
        </>
    )
}
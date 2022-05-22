import { useEffect, useState } from "react";

export function CategoryForm(props){
    let [title, setTitle] = useState('');
    let [status, setStatus] = useState('');
    let [category, setCategory] = useState();


    const handleChange = (e) => {
        // TODO: maintain state for the data
        let {name, value}  = e.target;
        if(name == 'title'){
            // TODO: Validation
            setTitle(value);
        }
        if(name == 'status'){
            // TODO: Validation
            setStatus(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onSubmitEvent({
            name: title,
            status: status
        });
    }

    useEffect(() => {
        setCategory(props.category);
    })

    // console.log("Props: ", props.category.status)
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label className="col-sm-3">Title: </label>
                    <div className="col-sm-9">
                        <input defaultValue={category?.name} type="text" name="title" required placeholder="Enter Category Name..." onChange={handleChange} className="form-control form-control-sm" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3">Status: </label>
                    <div className="col-sm-9">
                        <select name="status"  onChange={handleChange} id="status" required className="form-control form-control-sm">
                            <option value="active" selected={category ? (category.status == 'active' ? true : false) : false}>Active</option>
                            <option value="inactive" selected={category ? (category.status == 'inactive' ? true : false) : false}>Inactive</option>
                        </select>
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
        </>

    );
}
import { CategoryForm } from "./category-form.component";
import { CategoryService } from "./category.service";
import { toast } from "react-toastify";
import { useNavigate} from "react-router-dom";

export function CategoryCreate() {
    let catSvc = new CategoryService();
    let navigate = useNavigate();

    const addCatgory = (data) => {
        // console.log("Data: ", data )
        catSvc.addCategory(data)
        .then((response) => {
            if(response.data.status == 200){
                toast.success(response.data.msg);
                navigate('/admin/category')
            } else{
                toast.error(response.data.msg);
                // navigate('/admin/category')
            }
        })
    }
    return (
        <>
            <h4>Category form</h4>
            <CategoryForm onSubmitEvent={addCatgory}></CategoryForm>
        </>
    )
}
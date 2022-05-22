import { http } from "../../../services/http.service"

export class CategoryService {
    addCategory = (data) => {
        // Axios
        return http.postItem('/category', data, true);
    }

    getAllCats = () => {
        // console.log("All Cats");
        return http.getItem('/category',true);
    }


    getCategoryById = (id) => {
        return http.getItem('/category/'+id);
    }

    updateCategoryById = (id, data) => {
        return http.updateItem('/category/'+id, data,true);
    }
}
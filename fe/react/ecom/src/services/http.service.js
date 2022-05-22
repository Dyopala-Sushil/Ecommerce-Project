import axios from "axios";

const getHeaders = () => {
    const headers = {
        "content-type": "application/json"
    }
    return headers;
}

const axiosReq = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    responseType: "json",
    timeout: 30000,
    timeoutErrorMessage: "Request timed out",
    headers: getHeaders()
});

const postItem = (url, data, is_strict=false) => {
    let config = getHeaders();
    if(is_strict){
        config['authorization'] = localStorage.getItem('_token');
    }

    return axiosReq.post(url, data, {
        headers: config
    });

}
const getItem = (url, is_strict=false) => {
    let config = getHeaders();
    if(is_strict){
        config['authorization'] = localStorage.getItem('_token');
    }

    return axiosReq.get(url, {
        headers: config
    });

}
const updateItem = (url, data, is_strict=false) => {
    let config = getHeaders();
    if(is_strict){
        config['authorization'] = localStorage.getItem('_token');
    }

    return axiosReq.put(url,data, {
        headers: config
    });

}
const deleteItem = (url, is_strict=false) => {
    let config = getHeaders();
    if(is_strict){
        config['authorization'] = localStorage.getItem('_token');
    }

    return axiosReq.delete(url, {
        headers: config
    });

}

const uploadItem = (method, url, data, files, is_strict = false) => {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        let form_data = new FormData();

        if(files && files.length > 0){
            files.map((o) => {
                form_data.append('image', o, o.name);
            })
        }

        for(let key in data){
            form_data.append(key, data[key]);
        }

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                let response;
                if(typeof(xhr.response) != "object"){
                    response = JSON.parse(xhr.response);
                }

                if(response.status){
                    res(response)
                } else {
                    rej(response)
                }
            }
        }

        xhr.open(method, process.env.REACT_APP_BASE_API_URL+url);
        if(is_strict){
            xhr.setRequestHeader('authorization', localStorage.getItem('_token'));
        }
        xhr.send(form_data);
   })
}


export const http = {
    postItem,
    updateItem,
    getItem,
    deleteItem,
    uploadItem
}
import { http } from "../services/http.service"

export const SearchActionTypes={
    SET_KEYWORD: "SET_KEYWORD",
    SET_RESULT: "SET_RESULT"
}

export const setKeyword = (keyword) => dispatch => {
    return dispatch({
        type: SearchActionTypes.SET_KEYWORD,
        payload: keyword
    })
}

export const setResult = (keyword) => dispatch => {
    // axios 
    http.getItem('/product?key='+keyword)
    .then((response) => {
        //console.log(response)
        if(response.data.status){
            return dispatch({
                type: SearchActionTypes.SET_RESULT,
                payload: response.data.data
            })
        } else {
            return dispatch({
                type: SearchActionTypes.SET_RESULT,
                payload: []
            })
        }
    }) 
    .catch((error) => {
        console.log("Error: ", JSON.stringify(error));
        return dispatch({
            type: SearchActionTypes.SET_RESULT,
            payload: []
        })
    })

}
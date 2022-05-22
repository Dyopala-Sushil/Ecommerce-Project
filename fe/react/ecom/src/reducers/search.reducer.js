import { SearchActionTypes } from "../actions/search.acts"

export const SearchReducer = (state, action) => {
    
    switch(action.type){
        case SearchActionTypes.SET_KEYWORD:
            return {
                ...state,
                keyword: action.payload
            }
        case SearchActionTypes.SET_RESULT:
            return {
                ...state,
                search_result: action.payload
            }
        default: 
            return {
                ...state
            }
    }
    
}
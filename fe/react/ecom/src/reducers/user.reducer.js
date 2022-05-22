import { UserActionTypes } from "../actions/user.acts"

// UI => Action => Reducer => store
export const UserReducer = (state, action) => {

    switch(action.type){
        
        case UserActionTypes.LOGIN:
            return {
                ...state,
                user: action.payload
            }

        default:
            return {
                ...state
            }
    }
}
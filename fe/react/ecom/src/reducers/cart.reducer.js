export const CartReducer = (state={
    counter: 0
}, action) => {

    switch(action.type){
        default: 
            return {
                ...state,
                counter: action.payload
            }
    }
}
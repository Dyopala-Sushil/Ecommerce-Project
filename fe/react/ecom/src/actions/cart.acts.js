export const CartActionTypes={
    SET_COUNTER: "SET_COUNTER"
}

export const setCounter = (counter) => {
    return {
        type: CartActionTypes.SET_COUNTER,
        payload: counter
    }
}
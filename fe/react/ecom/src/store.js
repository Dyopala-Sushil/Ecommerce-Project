import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk"
import { RootReducer } from "./reducers";

const middlewares = [thunk];



// UI  =======> Action =========> Reducer ======> Store update

const defaultState = {
    product: {
        products: [],
        product: {},
        isLoading: false
    },
    category: {
        categories: [],
        category: [],
        isLoading: false
    },
    user: {
        user: {},
        isLoading: false
    },
    search: {
        keyword: '',
        search_result: []
    },
    cart: {
        counter: 0
    }
};

export const store = createStore(RootReducer, defaultState, applyMiddleware(...middlewares))
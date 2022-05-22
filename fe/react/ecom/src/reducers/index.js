import { combineReducers } from "redux";
import { UserReducer } from "./user.reducer";
import { ProductReducer } from "./product.reducer";
import { CategoryReducer } from "./category.reducer";
import { SearchReducer } from "./search.reducer";
import { CartReducer } from "./cart.reducer";

export const RootReducer = combineReducers({
    user: UserReducer,
    product: ProductReducer,
    category: CategoryReducer,
    search: SearchReducer,
    cart: CartReducer
});
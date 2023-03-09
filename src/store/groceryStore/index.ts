import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductGroceryShop } from "../../shared/interfaces";

interface ICart {
    products: IProductGroceryShop[];
}

const initialState: ICart = {
    products: [],
};

const cartSlice = createSlice({
name: "cartGrocery",
initialState,
reducers: {
    addProduct: (state, action: PayloadAction<IProductGroceryShop>) => {
    const existingProduct = state.products.find(
        (p) => p.name === action.payload.name
    );
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        state.products.push({ ...action.payload, quantity: 1 });
    }
    },
    // removeProduct: (state, action: PayloadAction<IProductGroceryShop>) => {
    // state.products = state.products.filter(
    //     (p) => p.name !== action.payload.name
    // );
    // },
    changeQuantity: (
        state,
        action: PayloadAction<{ product: IProductGroceryShop; quantity: number }>
    ) => {
    if (action.payload.quantity <= 0) {
        state.products = state.products.filter(
            (p) => p.name !== action.payload.product.name
        );
    } else {
        const product = state.products.find(
            (p) => p.name === action.payload.product.name
        );
        if (product) {
            product.quantity = action.payload.quantity;
        }
    }
    },
},
});

export const { addProduct, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;
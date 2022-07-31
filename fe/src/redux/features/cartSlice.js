import { createSlice } from "@reduxjs/toolkit";

let data = localStorage.getItem("WEBCART")

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: data ? JSON.parse(data) : []
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
            return state;
        },
        addToCart: (state, action) => {
            if (isExist(state.cart, action.payload.id) < 0) {
                state.cart.push({
                    item: action.payload,
                    quantity: 1
                })
            } else {
                state.cart[isExist(state.cart, action.payload.id)].quantity += 1
            }
            localStorage.setItem("WEBCART", JSON.stringify(state.cart))
            // return state;
        },
        updateCartItemQuantity: (state, action) => {
            if (isExist(state.cart, action.payload.id) >= 0) {
                console.log(action)
                if (action.payload.quantity > 0) {
                    state.cart[isExist(state.cart, action.payload.id)].quantity = action.payload.quantity
                }
            }
            localStorage.setItem("WEBCART", JSON.stringify(state.cart))
            // return state;


        },
        removeCartItem: (state, action) => {
            if (isExist(state.cart, action.payload.id) >= 0) {
                state.cart.splice((isExist(state.cart, action.payload.id)), 1)
            }
            localStorage.setItem("WEBCART", JSON.stringify(state.cart))
            // return state;

        },
        clearCart: (state) => {
            state.cart = []
            localStorage.setItem("WEBCART", JSON.stringify(state.cart))
            return state
        }
    }
})

const isExist = (arr, id) => {
    let result = -1;
    if (arr.length == 0) {
        return result;
    }
    arr.forEach((item, index) => {
        if (item.item.id === id) {
            result = index
        }
    })
    return result
}

export const { addToCart, updateCartItemQuantity, removeCartItem, setCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
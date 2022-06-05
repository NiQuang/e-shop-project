import { createSlice } from "@reduxjs/toolkit";

let data = localStorage.getItem("WEBCART")

export const cartSlice = createSlice({
    name: 'cart',
    initialState: data ? JSON.parse(data) : [],
    reducers: {
        addToCart: (state, action) => {
            if(isExist(state, action.payload.id) < 0){
                state.push({
                    item: action.payload,
                    quantity: 1
                })
            }else{
                state[isExist(state, action.payload.id)].quantity += 1
            }
            localStorage.setItem("WEBCART", JSON.stringify(state))
        },
        updateCartItemQuantity: (state, action) => {
            if(isExist(state, action.payload.id) >= 0 ){
                console.log(action)
                if(action.payload.quantity > 0){
                    state[isExist(state, action.payload.id)].quantity = action.payload.quantity
                }
            }
            localStorage.setItem("WEBCART", JSON.stringify(state))

        },
        removeCartItem: (state, action) => {
            if(isExist(state, action.payload.id) >= 0 ){
                state.splice((isExist(state, action.payload.id)), 1)
            }
            localStorage.setItem("WEBCART", JSON.stringify(state))
        }
    }
})

const isExist = (arr,id) => {
    let result = -1;
    if(arr.length == 0 ){
        return result;
    }
    arr.forEach((item, index) => {
        if(item.item.id === id){
            result = index
        }
    })
    return result
}

export const {addToCart, updateCartItemQuantity, removeCartItem} = cartSlice.actions

export default cartSlice.reducer
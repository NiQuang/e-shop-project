import { createSlice } from "@reduxjs/toolkit";

let token = localStorage.getItem("TOKEN")
let user = localStorage.getItem("USER")

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: token ? true : false,
        user: {
            ...JSON.parse(user)
        },
        token: JSON.parse(token)
    },
    reducers: {
        signin: (state, action) => {
            state.isAuth = true
            state.user=action.payload
            state.token = `${action.payload.tokenType} ${action.payload.accessToken}`
            localStorage.setItem("USER", JSON.stringify(action.payload))
            localStorage.setItem("TOKEN", JSON.stringify(`${action.payload.tokenType} ${action.payload.accessToken}`))
        
        },
        signout: (state) => {
            console.log('signout')
            state.isAuth = false
            state.user = null
            state.token = null
            localStorage.removeItem("USER")
            localStorage.removeItem("TOKEN")

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

export const {signin, signout} = authSlice.actions

export default authSlice.reducer
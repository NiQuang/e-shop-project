import {configureStore} from '@reduxjs/toolkit'
import cartSlice from './features/cartSlice'
import authSlice from './features/authSlice'

export default configureStore({
    reducer:{
        cart: cartSlice,
        auth: authSlice
    }
})
import { configureStore } from "@reduxjs/toolkit";
import cryptoSlice from "../slice/CryptoSlice";
const store = configureStore({
    reducer :{
        cryptoSlice,
    }
})

export default store;
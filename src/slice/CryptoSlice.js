import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    DATA :[],
    COIN:[]
};

const cryptoSlice = createSlice({
    name : "coins",
    initialState,
    reducers : {
        SetData:(state,action)=>{
            state.DATA = action.payload
        },
        SetCoin:(state,action)=>{
            state.COIN = action.payload
        }
    }
});

export const {SetData,SetCoin} = cryptoSlice.actions;
export default cryptoSlice.reducer;
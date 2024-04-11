import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    DATA :[],
    COIN:[],
    Details:[]
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
        },
        SetDetails:(state,action)=>{
            state.Details = action.payload
        }
    }
});

export const {SetData,SetCoin,SetDetails} = cryptoSlice.actions;
export default cryptoSlice.reducer;
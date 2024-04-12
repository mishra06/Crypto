import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    DATA :[],
    COIN:[],
    Details:[],
    CHART:[]
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
        },
        SetChart:(state,action)=>{
            state.CHART = action.payload
        }
    }
});

export const {SetData,SetCoin,SetDetails,SetChart} = cryptoSlice.actions;
export default cryptoSlice.reducer;
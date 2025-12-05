import { createSlice } from "@reduxjs/toolkit";


const searchCache = createSlice({
    name:"searchCache",
    initialState:{
        searchCache: [],
        maxCache:20,
    },
    reducers:{
        addToCache : (state,action)=>{
            state.searchCache.unshift(action.payload);
            if(state.searchCache.length >= state.maxCache){
                state.searchCache.pop();
            }
        }
    }
})

export const { addToCache } = searchCache.actions;
export default searchCache.reducer;
import { configureStore } from "@reduxjs/toolkit";
import searchCache from './searchCache';

export const appStore = configureStore({
    reducer: {
        cache: searchCache,
    }
})

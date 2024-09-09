import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initSliceReducer } from "../../global/config";
import { QUERY_AUTHENTICATED } from "../typePrefixs";
import axios from "axios";

const queryLogin = async (payload) => {
    try {
        const result = await axios.post('https://web80-social-app-server.onrender.com/api/v1/users/sign-in', payload);
        return result.data;
    } catch (error) {
        throw {
            ...error.response.data
        };
    }

}

export const queryAuthenticated = createAsyncThunk(QUERY_AUTHENTICATED, queryLogin);
const authenticated = createSlice({
    initialState: initSliceReducer,
    reducers: {},
    name: 'authenticated',
    extraReducers(builder) {
        // tham số đầu tiên thể hiện call back promise
        builder.addCase(queryAuthenticated.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(queryAuthenticated.fulfilled, (state, action) => {
            console.log('fulfiled', action.payload);
            state.isLoading = false;

        });
        builder.addCase(queryAuthenticated.rejected, (state, action) => {
            state.isLoading = false;
            state.success = false;
            state.message = action.error.message;
        });
    }
});

export default authenticated;
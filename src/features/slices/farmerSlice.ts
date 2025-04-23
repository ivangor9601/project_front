import { createSlice } from "@reduxjs/toolkit"
import {registerFarmerFetch, loginFarmerFetch, checkFarmerEmailFetch} from "../actions/farmerAction.ts";

const FarmerSlice = createSlice({
    name: "farmer",
    initialState: {
        data: null,
        status: ""
    },
    reducers: {
        deleteUser(state) {
            state.data = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerFarmerFetch.pending, (state) => {
                state.status = "Pending...";
            })
            .addCase(registerFarmerFetch.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "Success!";
            })
            .addCase(registerFarmerFetch.rejected, (state, action) => {
                state.status = "Register Error: " + action.error.message;
            })
            .addCase(loginFarmerFetch.pending, (state) => {
                state.status = "Pending...";
            })
            .addCase(loginFarmerFetch.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "Success!";
            })
            .addCase(loginFarmerFetch.rejected, (state, action) => {
                console.log(action.payload);
                state.status = "Login Error: " + action.error.message;
            })
            .addCase(checkFarmerEmailFetch.pending, (state) => {
                state.status = "Pending...";
            })
            .addCase(checkFarmerEmailFetch.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "Success!";
            })
            .addCase(checkFarmerEmailFetch.rejected, (state, action) => {
                state.status = "Register Error: " + action.error.message;
            })
    }
})

export const {deleteUser} = FarmerSlice.actions;
export default FarmerSlice;
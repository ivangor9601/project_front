import { createSlice } from "@reduxjs/toolkit"
import {checkClientEmailFetch, loginClientFetch, registerClientFetch} from "../actions/clientAction"

const ClientSlice = createSlice({
    name: "client",
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
            .addCase(registerClientFetch.pending, (state) => {
                state.status = "Pending...";
            })
            .addCase(registerClientFetch.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "Success!";
            })
            .addCase(registerClientFetch.rejected, (state, action) => {
                state.status = "Register Error: " + action.error.message;
            })
            .addCase(loginClientFetch.pending, (state) => {
                state.status = "Pending...";
            })
            .addCase(loginClientFetch.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "Success!";
            })
            .addCase(loginClientFetch.rejected, (state, action) => {
                state.status = "Login Error: " + action.error.message;
            })
            .addCase(checkClientEmailFetch.pending, (state) => {
                state.status = "Pending...";
            })
            .addCase(checkClientEmailFetch.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = "Success!";
            })
            .addCase(checkClientEmailFetch.rejected, (state, action) => {
                state.status = "Register Error: " + action.error.message;
            })
    }
})

export const {deleteUser} = ClientSlice.actions;
export default ClientSlice;
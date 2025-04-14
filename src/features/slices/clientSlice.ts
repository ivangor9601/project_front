import { createSlice } from "@reduxjs/toolkit"
import {checkClientEmailFetch, loginFetch, registerFetch} from "../actions/clientAction"

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
            .addCase(registerFetch.pending, (state) => {
                state.status = "Pending...";
            })
            .addCase(registerFetch.fulfilled, (state, action) => {
                state.data = action.payload;
                console.log(state.data);
                state.status = "Success!";
            })
            .addCase(registerFetch.rejected, (state, action) => {
                state.status = "Register Error: " + action.error.message;
            })
            .addCase(loginFetch.pending, (state) => {
                state.status = "Pending...";
            })
            .addCase(loginFetch.fulfilled, (state, action) => {
                state.data = action.payload;
                console.log(state.data);
                state.status = "Success!";
            })
            .addCase(loginFetch.rejected, (state, action) => {
                state.status = "Register Error: " + action.error.message;
            })
            .addCase(checkClientEmailFetch.pending, (state) => {
                state.status = "Pending...";
            })
            .addCase(checkClientEmailFetch.fulfilled, (state, action) => {
                state.data = action.payload;
                console.log(state.data);
                state.status = "Success!";
            })
            .addCase(checkClientEmailFetch.rejected, (state, action) => {
                state.status = "Register Error: " + action.error.message;
            })
    }
})

export const {deleteUser} = ClientSlice.actions;
export default ClientSlice;
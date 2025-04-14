import { createSlice } from "@reduxjs/toolkit"

const tokenSlice = createSlice({
    name: "token",
    initialState: {
        name: ""
    },
    reducers: {
        putToken: (state, action) => {
            state.name = action.payload;
        },
        deleteToken: (state) => {
            state.name = ""
        }
    }
})

export default tokenSlice;
export const {putToken, deleteToken} = tokenSlice.actions;
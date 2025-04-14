import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "../../utils/constants.ts";

export const registerFetch = createAsyncThunk(
    "client/registerFetch",
    async (registerUser, {rejectWithValue}) => {
        try{
            const response = await fetch(`${BASE_URL}/clients/register`, {
                method: "POST",
                body: JSON.stringify(registerUser),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error || "Something went wrong");
            }
            return await response.json();
        } catch (e) {
            return e;
        }
    }
)

export const checkClientEmailFetch = createAsyncThunk(
    "client/checkClientEmailFetch",
    async (clientEmail, {rejectWithValue}) => {
        try {
            const response = await fetch(`${BASE_URL}/clients/checkEmail/${clientEmail}`, {
                method: 'GET'
            });
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error || "Something went wrong");
            }
            return await response.json();
        } catch (e) {
            return e;
        }
    }
)

export const loginFetch = createAsyncThunk(
    "client/loginFetch",
    async (loginUser, {rejectWithValue}) => {
        try{
            const response = await fetch(`${BASE_URL}/clients/login`, {
                method: "POST",
                body: JSON.stringify(loginUser),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error || "Something went wrong");
            }
            return await response.json();
        } catch (e) {
            return e;
        }
    }
)
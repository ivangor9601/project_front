import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "../../utils/constants.ts";

export const registerFarmerFetch = createAsyncThunk(
    "farmer/registerFarmerFetch",
    async (registerUser, {rejectWithValue}) => {
        try{
            const response = await fetch(`${BASE_URL}/farmers/register`, {
                method: "POST",
                body: JSON.stringify(registerUser),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                if (!response.ok) {
                    return rejectWithValue(data || "Something went wrong");
                }
                return data;
            } catch (err) {
                console.error("Failed to parse JSON:", text);
                return rejectWithValue("Server returned invalid JSON");
            }
        } catch (e) {
            return e;
        }
    }
)

export const checkFarmerEmailFetch = createAsyncThunk(
    "farmer/checkFarmerEmailFetch",
    async (farmerEmail, {rejectWithValue}) => {
        try {
            const response = await fetch(`${BASE_URL}/farmers/checkemail/${farmerEmail}`, {
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

export const loginFarmerFetch = createAsyncThunk(
    "farmer/loginFarmerFetch",
    async (loginUser, {rejectWithValue}) => {
        try{
            const response = await fetch(`${BASE_URL}/farmers/login`, {
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
        } catch (e: unknown) {
            let message = "Something went wrong";
            if (e instanceof Error) {
                message = e.message;
            }
            return rejectWithValue({ message });
        }
    }
)
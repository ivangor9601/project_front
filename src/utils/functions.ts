import React from "react";

export const validateEmail = (email: string) => {
    if (!email.trim()) {
        return "Field must not be empty";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return "Enter a valid email address"
    }
    return false;
}

export const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, func: (value: (((prevState: string) => string) | string)) => void) => {
    const value = e.target.value;
    if(value === "" || /^[+]?\d*$/.test(value)) {
        func(value);
    }
}
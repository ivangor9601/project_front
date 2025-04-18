import {useState} from "react";
import {checkClientEmailFetch, registerClientFetch} from "../features/actions/clientAction.js";
import {useAppDispatch, useAppSelector} from "../app/hooks.js";
import {useNavigate} from "react-router-dom";
import FormField from "../utilComponents/FormField.jsx";
import {handlePhoneChange, validateEmail} from "../utils/functions.js";

const RegisterClient = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState(null);
    const [hasCheckedEmail, setHasCheckedEmail] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordCheckBox, setPasswordCheckBox] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [empty, setEmpty] = useState({});
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { data, status } = useAppSelector((state) => state.client)

    const handleCheckEmail = async (flag) => {
        const notValid = validateEmail(email);
        if(notValid) {
            setEmpty(prevState => ({
                ...prevState,
                email: notValid
            }))
        } else {
            flag ? setHasCheckedEmail(true) : null;
            const resultAction = await dispatch(checkClientEmailFetch(email));
            if(resultAction.payload) {
                setCheckEmail(true);
                setEmpty(prev => ({
                    ...prev,
                    email: "Email is not available"
                }));
                return true;
            } else {
                setCheckEmail(false);
            }
        }
    }

    const handleClickRegister = async () => {
        const errors = {};
        if (!firstName.trim()) errors.firstName = "Field must not be empty";
        if (!lastName.trim()) errors.lastName = "Field must not be empty";
        if (password.length < 8 || password.length > 32) {
            errors.password = "Password must be 8–32 characters long";
        } else if (/^([^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(password)) {
            errors.password = "Password must include uppercase, lowercase, a number and a special character";
        }
        if (confirmPassword !== password) {
            errors.confirmPassword = "Passwords do not match";
        }
        const emailError = validateEmail(email);
        if(emailError) {
            errors.email = emailError;
        }
        if (!/^[+]?\d{7,15}$/.test(phoneNumber.trim())) {
            errors.phoneNumber = "Enter a valid phone number";
        }
        if (!city.trim()) errors.city = "Field must not be empty";
        if (Object.keys(errors).length > 0) {
            setEmpty(prev => ({
                ...prev,
                ...errors
            }));
            return;
        }
        if(await handleCheckEmail()) {
            return;
        }

        const client = {
            firstName,
            lastName,
            password,
            phoneNumber,
            city,
            email
        }
        const resultAction = await dispatch(registerClientFetch(client));

        if (registerClientFetch.fulfilled.match(resultAction)) {
            console.log(resultAction);
            navigate("/regsuccess");
        } else if (registerClientFetch.rejected.match(resultAction)) {
            console.error("Registration failed:", resultAction.payload || resultAction.error.message);
        }
        setFirstName("");
        setLastName("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setPhoneNumber("");
        setCity("");
        setPasswordCheckBox(false);
    }

    return (
        <div className="d-flex">
            <div style={{ maxWidth: "500px", width: "100%" }}>
                {status.includes("Error") && <p style={{ color: 'red' }}>{status}</p>}
                <div className="row gy-3">
                    <FormField label="First name" name="firstName" id="firstName"
                               type="text" value={firstName} error={empty.firstName}
                               onChange={(e) => {
                                   setFirstName(e.target.value.trim());
                                   setEmpty(prevState => {
                                       const {firstName, ...rest} = prevState;
                                       return rest;
                                   })
                               }}/>
                    <FormField label="Last name" name="lastName" id="lastName"
                               type="text" value={lastName} error={empty.lastName}
                               onChange={(e) => {
                                   setLastName(e.target.value.trim());
                                   setEmpty(prevState => {
                                       const {lastName, ...rest} = prevState;
                                       return rest;
                                   })
                               }}/>
                    <div className="col-12">
                        <div className="form-floating d-flex">
                            <input type="text" className="form-control border-2" name="email" id="email" value={email}
                                   onChange={(e) => {
                                       setEmail(e.target.value.trim());
                                       setHasCheckedEmail(false);
                                       setEmpty(prevState => {
                                           const {email, ...rest} = prevState;
                                           return rest;
                                       });
                                       setCheckEmail(null);
                                   }}
                                   placeholder="Email" required/>
                            <button onClick={() => handleCheckEmail(true)}
                                    className={'window-button py-1 ms-2'}>Check e-mail availability
                            </button>
                            <label htmlFor="email">E-mail</label>
                        </div>
                        {checkEmail === false && hasCheckedEmail && (
                            <small style={{color: "green"}}>Email is available</small>
                        )}
                        {((checkEmail && hasCheckedEmail) || empty.email) && (
                            <small style={{color: "red"}}>{empty.email}</small>
                        )}
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type={passwordCheckBox ? "text" : "password"} className="form-control border-2"
                                   name="password" id="password" value={password}
                                   minLength={8} maxLength={32}
                                   onChange={(e) => {
                                       setPassword(e.target.value.trim());
                                       setEmpty(prevState => {
                                           const {password, ...rest} = prevState;
                                           return rest;
                                       });
                                   }}
                                   placeholder="Password" required/>
                            <label htmlFor="password">Password</label>
                            {empty.password && (
                                <small style={{color: "red"}}>{empty.password}</small>
                            )}
                        </div>
                        <label>
                            <input type="checkbox" checked={passwordCheckBox} className="me-1"
                                   onChange={() => setPasswordCheckBox(!passwordCheckBox)}/>
                            Show password
                        </label>
                    </div>
                    <FormField label="Confirm password" name="confirmPassword" id="confirmPassword"
                               type="password" value={confirmPassword} error={empty.confirmPassword}
                               onChange={(e) => {
                                   setConfirmPassword(e.target.value.trim());
                                   setEmpty(prevState => {
                                       const {confirmPassword, ...rest} = prevState;
                                       return rest;
                                   })
                               }}/>
                    <FormField label="Phone number" name="phoneNumber" id="phoneNumber"
                               type="tel" value={phoneNumber} error={empty.phoneNumber}
                               onChange={(e) => {
                                   handlePhoneChange(e, setPhoneNumber);
                                   setEmpty(prevState => {
                                       const {phoneNumber, ...rest} = prevState;
                                       return rest;
                                   })
                               }}/>
                    <FormField label="City" name="city" id="city"
                               type="text" value={city} error={empty.city}
                               onChange={(e) => {
                                   setCity(e.target.value.trim());
                                   setEmpty(prevState => {
                                       const {city, ...rest} = prevState;
                                       return rest;
                                   })
                               }}/>
                    <div className="col-12">
                        <div className="d-grid">
                            <button className="window-button py-3 w-100"
                                    onClick={handleClickRegister} type="submit">Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterClient;
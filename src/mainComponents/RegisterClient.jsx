import {useState} from "react";
import {checkClientEmailFetch, registerClientFetch} from "../features/actions/clientAction.js";
import {useAppDispatch, useAppSelector} from "../app/hooks.js";
import {useNavigate} from "react-router-dom";

const RegisterClient = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState(null);
    const [hasCheckedEmail, setHasCheckedEmail] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [empty, setEmpty] = useState({});
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { data, status } = useAppSelector((state) => state.client)

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if(value === "" || /^[+]?\d*$/.test(value)) {
            setPhoneNumber(value);
        }
    }

    const validateEmail = (email) => {
        if (!email.trim()) {
            return "Field must not be empty";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return "Enter a valid email address"
        }
        return false;
    }

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
    }

    return (
        <div className="d-flex">
            <div style={{ maxWidth: "500px", width: "100%" }}>
                {/*<h3 className="mb-4">Register</h3>*/}
                {status.includes("Error") && <p style={{ color: 'red' }}>{status}</p>}
                <div className="row gy-3">
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="text" className="form-control border-2" name="name" id="name" value={firstName}
                                   onChange={(e) => {
                                       setFirstName(e.target.value.trim());
                                       setEmpty(prevState => {
                                           const {firstName, ...rest} = prevState;
                                           return rest;
                                       });
                                   }}
                                   placeholder="First Name" required/>
                            <label>First name</label>
                            {empty.firstName && (
                                <small style={{color: "red"}}>{empty.firstName}</small>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="text" className="form-control border-2" name="lastname" id="lastname"
                                   value={lastName}
                                   onChange={(e) => {
                                       setLastName(e.target.value.trim());
                                       setEmpty(prevState => {
                                           const {lastName, ...rest} = prevState;
                                           return rest;
                                       });
                                   }}
                                   placeholder="Last Name" required/>
                            <label>Last name</label>
                            {empty.lastName && (
                                <small style={{color: "red"}}>{empty.lastName}</small>
                            )}
                        </div>
                    </div>
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
                                   }}
                                   placeholder="Email" required/>
                            <button onClick={() => handleCheckEmail(true)}
                                    className={'window-button py-1'}
                                    style={{marginLeft: '5px'}}>Check e-mail availability</button>
                            <label>E-mail</label>
                        </div>
                        {!checkEmail && hasCheckedEmail && (
                            <small style={{color: "green"}}>Email is available</small>
                        )}
                        {((checkEmail &&  hasCheckedEmail) || empty.email) && (
                            <small style={{color: "red"}}>{empty.email}</small>
                        )}
                    </div>
                    <div className="col-12">
                    <div className="form-floating">
                            <input type="password" className="form-control border-2" name="password" id="password"
                                   value={password}
                                   minLength={8} maxLength={32}
                                   onChange={(e) => {
                                       setPassword(e.target.value.trim());
                                       setEmpty(prevState => {
                                           const {password, ...rest} = prevState;
                                           return rest;
                                       });
                                   }}
                                   placeholder="Password" required/>
                            <label>Password</label>
                            {empty.password && (
                                <small style={{color: "red"}}>{empty.password}</small>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="password" className="form-control border-2" name="confirmPassword" id="confirmPassword"
                                   value={confirmPassword}
                                   onChange={(e) => {
                                       setConfirmPassword(e.target.value.trim());
                                       setEmpty(prevState => {
                                           const {confirmPassword, ...rest} = prevState;
                                           return rest;
                                       });
                                   }}
                                   placeholder="Password" required/>
                            <label>Confirm password</label>
                            {empty.confirmPassword && (
                                <small style={{color: "red"}}>{empty.confirmPassword}</small>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="tel" className="form-control border-2" name="phonenumber" id="phonenumber"
                                   value={phoneNumber}
                                   onChange={(e) => {
                                       handlePhoneChange(e);
                                       setEmpty(prevState => {
                                           const {phoneNumber, ...rest} = prevState;
                                           return rest;
                                       });
                                   }}
                                   placeholder="Phone number" required/>
                            <label>Phone number</label>
                            {empty.phoneNumber && (
                                <small style={{color: "red"}}>{empty.phoneNumber}</small>
                            )}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="text" className="form-control border-2" name="city" id="city" value={city}
                                   onChange={(e) => {
                                       setCity(e.target.value.trim());
                                       setEmpty(prevState => {
                                           const {city, ...rest} = prevState;
                                           return rest;
                                       });
                                   }}
                                   placeholder="City" required/>
                            <label>City</label>
                            {empty.city && (
                                <small style={{color: "red"}}>{empty.city}</small>
                            )}
                        </div>
                    </div>
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
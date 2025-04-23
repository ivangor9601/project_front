import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks.js";
import {useNavigate} from "react-router-dom";
import FormField from "../utilComponents/FormField.jsx";

const LoginRenderComponent = ({func, user}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheckBox, setPasswordCheckBox] = useState(false);
    const [empty, setEmpty] = useState({});
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const client = useAppSelector((state) => state.client);
    const farmer = useAppSelector((state) => state.farmer);
    let data, status;
    if(user === 'client') {
        data = client.data;
        status = client.status;
    } else if (user === 'farmer') {
        data = farmer.data;
        status = farmer.status;
    }

    const handleClickLogin = async () => {
        const errors = {};
        if (!email.trim()) errors.email = "Field must not be empty";
        if (!password.trim()) errors.password = "Field must not be empty";
        if (Object.keys(errors).length > 0) {
            setEmpty(prev => ({
                ...prev,
                ...errors
            }));
            return;
        }

        const user = {
            email,
            password
        }
        const result = await dispatch(func(user));
        if (func.fulfilled.match(result)) {
            navigate("/loginsuccess");
        } else if (func.rejected.match(result)) {
            console.error("Login failed:", result);
        }
        setEmail("");
        setPassword("");
        setPasswordCheckBox(false);
    }

    return (
        <div className="d-flex">
            <div style={{maxWidth: "500px", width: "100%"}}>
                {status.includes("Error") && <p style={{ color: 'red' }}>Incorrect login or password</p>}
                <div className="row gy-3">
                    <FormField label="E-mail" name="email" id="email"
                               type="text" value={email} error={empty.email}
                               onChange={(e) => {
                                   setEmail(e.target.value.trim());
                                   setEmpty(prevState => {
                                       const {email, ...rest} = prevState;
                                       return rest;
                                   })
                               }}/>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type={passwordCheckBox ? "text" : "password"} className="form-control border-2"
                                   name="password" id="password" value={password}
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
                    <div className="col-12">
                        <div className="d-grid">
                            <button className="window-button w-100 py-3"
                                    onClick={handleClickLogin}
                                    type="submit">Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginRenderComponent
import {useState} from "react";
import {useAppDispatch} from "../app/hooks.js";
import {useNavigate} from "react-router-dom";
import {loginFetch, registerFetch} from "../features/actions/clientAction.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClickLogin = async () => {
        const client = {
            email,
            password
        }
        const result = await dispatch(loginFetch(client));
        if (loginFetch.fulfilled.match(result)) {
            console.log(result);
            navigate("/loginsuccess");
        } else if (registerFetch.rejected.match(result)) {
            console.error("Login failed:", result.payload || result.error.message);
        }
        setEmail("");
        setPassword("");
    }

    return (
        <div className="d-flex">
            <div style={{maxWidth: "500px", width: "100%"}}>
                <h3 className="mb-4">Login</h3>
                <div className="row gy-3">
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="text" className="form-control border-2" name="email" id="email"
                                   value={email}
                                   onChange={(e) => {
                                       setEmail(e.target.value.trim())
                                   }}
                                   placeholder="Email" required/>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-floating">
                            <input type="password" className="form-control border-2" name="password" id="password"
                                   value={password}
                                   onChange={(e) => {
                                       setPassword(e.target.value.trim())
                                   }}
                                   placeholder="Password" required/>
                            <label htmlFor="password">Password</label>
                        </div>
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

export default Login
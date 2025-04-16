import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const RegSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login')
        }, 3500);
        return () => clearTimeout(timer);
    }, [navigate])

    return (
        <div style={{textAlign: "center", marginTop: "50px"}}>
            <h1>Registration successful!</h1>
            <h5>You will be redirected to the login page shortly...</h5>
        </div>
    )
}

export default RegSuccess;

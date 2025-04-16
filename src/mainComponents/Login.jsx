import ClientFarmerRadio from "../utilComponents/ClientFarmerRadio.jsx";
import LoginRenderComponent from "./LoginRenderComponent.jsx";
import {loginClientFetch} from "../features/actions/clientAction.js";
import {loginFarmerFetch} from "../features/actions/farmerAction.js";

const Login = () => {

    const renderComponent = (user) => {
        return user === "client" ? <LoginRenderComponent func={loginClientFetch}/> : <LoginRenderComponent func={loginFarmerFetch}/>
    }

    return <ClientFarmerRadio userString="client" actionName="Login"
                              renderComponent={renderComponent}/>
}

export default Login;
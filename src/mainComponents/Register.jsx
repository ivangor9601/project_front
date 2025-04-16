import RegisterClient from "./RegisterClient.jsx";
import RegisterFarmer from "./RegisterFarmer.jsx";
import ClientFarmerRadio from "../utilComponents/ClientFarmerRadio.jsx";

const Register = () => {

    const renderComponent = (user) => {
        return user === "client" ? <RegisterClient/> : <RegisterFarmer/>
    }

    return <ClientFarmerRadio userString="client" actionName="Register"
                              renderComponent={renderComponent}/>
}

export default Register;
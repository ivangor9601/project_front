import {useState} from "react";

const ClientFarmerRadio = ({userString, actionName, renderComponent}) => {
    const [user, setUser] = useState(userString);

    const handleChangeRadio = (e) => {
        setUser(e.target.value);
    }

    return (
        <div className="d-flex">
            <div style={{maxWidth: "500px", width: "100%"}}>
                <h3 className="mb-4">{actionName}</h3>
                <label className="mb-4 me-3">{actionName} as:</label>
                <label className="me-3">
                    <input
                        className="me-1" type="radio" value="client" name="user"
                        checked={user === "client"}
                        onChange={handleChangeRadio}
                    />
                    Client
                </label>
                <label>
                    <input
                        className="me-1" type="radio" value="farmer" name="user"
                        checked={user === "farmer"}
                        onChange={handleChangeRadio}
                    />
                    Farmer
                </label>
                {renderComponent(user)}
            </div>
        </div>
    )
}

export default ClientFarmerRadio;
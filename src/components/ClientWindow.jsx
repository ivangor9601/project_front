import {Component} from "react";
import ClientInfo from "./ClientInfo.jsx";

class ClientWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clients: []
        }
    }

    getAllClients = () => {
        fetch("http://localhost:8080/clients/all")
            .then(response => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error("Error");
                }
            })
            .then(data => {
                const clients = [];
                data.forEach(c => clients.push(c._email));
                console.log(clients);
                this.setState({
                    clients: clients
                })
            })
    }

    render(){
        return (
            <div>
                <button onClick={this.getAllClients}
                        className={"btn btn-light mx-1"} type={'submit'}>Get All Clients</button>
                <ClientInfo clientInfo={this.state.clients}/>
            </div>
        )
    }
}

export default ClientWindow;
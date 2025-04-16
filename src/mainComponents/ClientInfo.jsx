const ClientInfo = ({clientInfo}) => {
    return (
        <div>
            <ul>
                Clients: {clientInfo.map((client, index) => (
                    <li key={index}>{client}</li>
            ))}
            </ul>
        </div>
    )
}

export default ClientInfo;
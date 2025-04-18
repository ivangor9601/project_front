const FormField = ({type, name, id, value, label, onChange, error}) => {
    return (
        <div className="col-12">
            <div className="form-floating">
                <input type={type} className="form-control border-2"
                       name={name} id={id} value={value}
                       onChange={onChange}
                       placeholder={label} required/>
                <label htmlFor={id}>{label}</label>
                {error && <small style={{color: "red"}}>{error}</small>}
            </div>
        </div>
    )
}

export default FormField;
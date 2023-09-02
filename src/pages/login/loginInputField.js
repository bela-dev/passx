import DefaultInputField from "../../globalComponents/defaultInputField";

function LoginInputField(props) {

    return  <>
        <p className="label">{props.name}</p>
        <DefaultInputField
            onChange={(e) => props.onChange(e.target.value)}
            password={props.password}
            email={props.email}
            placeholder={"Enter " + props.name}
            autoComplete
            defaultValue={props.defaultValue ? props.defaultValue : ""}
            color={props.color ? props.color : ""}
        />
    </>;

}

export default LoginInputField;
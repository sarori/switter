import React, {useState} from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onClick = (e) => {
        e.preventDefault();
        toggleAccount(e.target.innerText);
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const toggleAccount = (name) => {
        const value = name === "CreateAccount" ? "Sign In" : name;
        return name;
    }
    return (
        <>
        <div>
            <input type="email" value={email} onChange={onChangeEmail} placeholder="Enter your email" />
            <input type="password" value={password} onChange={onChangePassword} name="password" />
            <button type="submit" onClick={onClick}>
                CreateAccount
            </button>
            <div>
                Sign In
            </div>
        </div>
        <div>
            <button type="button">Continue with Google</button>
        </div>
            
        </>
    );
};

export default Auth;
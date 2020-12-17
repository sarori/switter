import React, {useState} from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        // toggleAccount(e.target.innerText);
    };
    const onChange = (e) => {
        const  { target : {name, value}} = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        }
    };
    // const toggleAccount = (name) => {
    //     const value = name === "CreateAccount" ? "Sign In" : name;
    //     return name;
    // };
    return (
        <>
        <form onSubmit={onSubmit}>
            <input type="text" name="email" value={email} onChange={onChange} placeholder="Enter your email" required />
            <input type="password" name="password" value={password} onChange={onChange} required />
            <button type="submit" value="Log In" >
                CreateAccount
            </button>
            <div>
                Sign In
            </div>
        </form>
        <div>
            <button type="button">Continue with Google</button>
        </div>
        </>
    );
};

export default Auth;
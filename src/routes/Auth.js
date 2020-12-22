import React, {useState} from "react";
import {AuthService} from "../fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) => {
        const  { target : {name, value}} = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            let data;
            if (newAccount) {
                data = await AuthService.createUserWithEmailAndPassword(email, password);
                console.log("Sign in");
                setAccount(false);
            } else {
                data = await AuthService.signInWithEmailAndPassword(email, password);
                    console.log("Log in");
            } 
        } catch(error) {
                setError(error.message);
            }        
    };
    const toggleAccount = () => {
        setAccount((prev) => !prev);
    }
   
    return (
        <div>
        <form onSubmit={onSubmit}>
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Enter your email" required />
            <input type="password" name="password" value={password} onChange={onChange} required />
            <input type="submit"  onClick={onSubmit} value={newAccount ?  "Create Account" : "Log In"} />
        </form>
        {error}
        <div>
            <span onClick={toggleAccount}>{newAccount ? "Log In" : "Create Account"} </span>
            <button type="button">Continue with Google</button>
        </div>
        </div>
    );
};

export default Auth;
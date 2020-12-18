import React, {useState} from "react";
import {AuthService} from "../fbase";

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
    const createAccount = (e) => {
        AuthService.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log("Sign in");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    };
    const logIn = () => {
       AuthService.signInWithEmailAndPassword(email, password)
        .then((user) => {
            // Signed in
            // ...
            console.log("login");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    };
   
    return (
        <>
        <form onSubmit={onSubmit}>
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Enter your email" required />
            <input type="password" name="password" value={password} onChange={onChange} required />
            <button type="submit" value="Log In" onClick={createAccount}>
                CreateAccount
            </button>
            <div onClick={logIn}>
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
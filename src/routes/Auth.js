import React, {useState} from "react";
import {AuthService} from "../fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setAccount] = useState(true);
    const onChange = (e) => {
        const  { target : {name, value}} = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (newAccount){
            AuthService.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log("Sign in");
                setAccount(false);
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage);
            });
        }
        else {
            AuthService.signInWithEmailAndPassword(email, password)
            .then((user) => {
                // Signed in
                // ...
                console.log("login");
            })
            .catch((error) => {
                var errorMessage = error.message;
            });
        }
    };
  
   
    return (
        <div>
        <form onSubmit={onSubmit}>
            <input type="email" name="email" value={email} onChange={onChange} placeholder="Enter your email" required />
            <input type="password" name="password" value={password} onChange={onChange} required />
            <input type="submit"  onClick={onSubmit} value={newAccount ?  "Create Account" : "Log In"} />
        </form>
        <div>
            <button type="button">Continue with Google</button>
        </div>
        </div>
    );
};

export default Auth;
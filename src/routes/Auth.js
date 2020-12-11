import React from "react";
// import firebase from "firebase";
import fbase from "../fbase";

// import "firebase/auth";

const auth = fbase.auth();
// auth.createUserWithEmailAndPassword(email, pass);
console.log("auth is   ", auth);

const Auth = () => {
    const onSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
        <div>
            <input type="email" value={email} placeholder="Enter your email" />
            <input type="password" value={password}/>
            <button type="submit" onClick={onSubmit}>
                CreateAccount
            </button>
            {/* console.log(email, password); */}
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
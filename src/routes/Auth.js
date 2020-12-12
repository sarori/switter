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
            <input type="email" name="email" placeholder="Enter your email" />
            <input type="password" name="password" value={...name}/>
            <button type="submit" onClick={onSubmit}>
                CreateAccount
            </button>
            {/* console.log(name.value); */}
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
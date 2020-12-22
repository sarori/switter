import React from "react";
import {useHistory} from "react-router-dom";
import {AuthService} from "../fbase";

const Profile = () => {
    let history = useHistory();
    const signOut = () => {
        AuthService.signOut();
        history.push("/");
    }
    return (
        <>
            <button onClick={signOut}>Log Out</button>
        </>
    );
};

export default Profile;
import React, {useState} from 'react';
import AppRouter from "./Router";
import {AuthService} from "../fbase";


const App = () => {
  const [init, setInit] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  AuthService.onAuthStateChanged((user) => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
    setInit(true);
  });
  return (init ? <AppRouter isLogged={isLogged} /> : "Initializing...");
}

export default App;

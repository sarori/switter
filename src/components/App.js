import React, {useState} from 'react';
import AppRouter from "./Router";
import {AuthService} from "../fbase";


const App = () => {
  const [isLogged, setIsLogged] = useState(AuthService.currentUser);
  console.log(isLogged);
  return <AppRouter isLogged={isLogged} />;
}

export default App;

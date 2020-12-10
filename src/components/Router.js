import React, {useState} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../routes/Home';
import Auth from "../routes/Auth";

const AppRouter = () =>  {
    const [IsLogged, setIsLogged] = useState(false);
    return (
        <Router>
            <Switch>
                {IsLogged ? (
                    <>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                    </>
                    ) : (
                    <>
                        <Route path="/" exact>
                            <Auth />
                         </Route>
                    </>
            )}
            </Switch>
    </Router>
    );
};

export default AppRouter;
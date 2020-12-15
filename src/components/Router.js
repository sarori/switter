import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../routes/Home';
import Auth from "../routes/Auth";


const AppRouter = ({isLogged}) =>  {
    return (
        <Router>
            <Switch>
                {isLogged ? (
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
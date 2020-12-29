import React from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import Home from "../routes/Home"
import Auth from "../routes/Auth"
import Profile from "../routes/Profile"
import Navigation from "./Navigation"

const AppRouter = ({ isLogged }) => {
	return (
		<Router>
			{isLogged && <Navigation />}
			<Switch>
				{isLogged ? (
					<>
						<Route path="/" exact>
							<Home />
						</Route>
						<Route path="/profile" exact>
							<Profile />
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
	)
}

export default AppRouter

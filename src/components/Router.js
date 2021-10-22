import React from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import Home from "../routes/Home"
import Auth from "../routes/Auth"
import Profile from "../routes/Profile"
import Navigation from "./Navigation"

const AppRouter = ({ refreshUser, isLogged, userObj }) => {
	return (
		<Router>
			{isLogged && <Navigation userObj={userObj} />}
			<Switch>
				{isLogged ? (
					<div
						style={{
							maxWidth: 890,
							width: "100%",
							margin: "0 auto",
							marginTop: 80,
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Route path="/" exact>
							<Home userObj={userObj} />
						</Route>
						<Route path="/profile" exact>
							<Profile userObj={userObj} refreshUser={refreshUser} />
						</Route>
					</div>
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

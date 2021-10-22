import React, { useState, useEffect } from "react"
import AppRouter from "./Router"
import { AuthService } from "../fbase"
// import { db } from "../fbase"

const App = () => {
	const [init, setInit] = useState(false)
	const [isLogged, setIsLogged] = useState(false)
	const [userObj, setUserObj] = useState(null)
	useEffect(() => {
		AuthService.onAuthStateChanged((user) => {
			if (user) {
				setIsLogged(true)
				setUserObj({
					displayName: user.displayName,
					uid: user.uid,
					updateProfile: (args) => user.updateProfile(args),
				})
			} else {
				setIsLogged(false)
			}
			setInit(true)
		})
	}, [])
	const refreshUser = () => {
		const user = AuthService.currentUser
		setUserObj({
			displayName: user.displayName,
			uid: user.uid,
			updateProfile: (args) => user.updateProfile(args),
		})
	}
	return (
		<>
			{init ? (
				<AppRouter
					refreshUser={refreshUser}
					isLogged={Boolean(userObj)}
					userObj={userObj}
				/>
			) : (
				"Initializing..."
			)}
			<footer> &copy; {new Date().getFullYear()} Twitter</footer>
		</>
	)
}

export default App

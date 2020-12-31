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
				setUserObj(user)
			} else {
				setIsLogged(false)
			}
			setInit(true)
		})
	}, [])
	return (
		<>
			{init ? <AppRouter isLogged={isLogged} userObj={userObj} /> : "Initializing..."}
			<footer> &copy; {new Date().getFullYear()} Twitter</footer>
		</>
	)
}

export default App

import React, { useState, useEffect } from "react"
import AppRouter from "./Router"
import { AuthService } from "../fbase"
// import { db } from "../fbase"

const App = () => {
	const [init, setInit] = useState(false)
	const [isLogged, setIsLogged] = useState(false)

	useEffect(() => {
		AuthService.onAuthStateChanged((user) => {
			if (user) {
				setIsLogged(true)
			} else {
				setIsLogged(false)
			}
			setInit(true)
		})
	}, [])
	return (
		<>
			{init ? <AppRouter isLogged={isLogged} /> : "Initializing..."}
			<footer> &copy; {new Date().getFullYear()} Twitter</footer>
		</>
	)
}

export default App

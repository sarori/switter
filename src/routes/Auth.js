import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons"
import { AuthService, firebaseInstance } from "../fbase"

const Auth = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [newAccount, setNewAccount] = useState(true)
	const [error, setError] = useState("")

	const toggleAccount = () => setNewAccount((prev) => !prev)
	const onChange = (event) => {
		const {
			target: { name, value },
		} = event
		if (name === "email") {
			setEmail(value)
		} else if (name === "password") {
			setPassword(value)
		}
	}
	const onSubmit = async (event) => {
		event.preventDefault()
		try {
			let data
			if (newAccount) {
				data = await AuthService.createUserWithEmailAndPassword(email, password)
			} else {
				data = await AuthService.signInWithEmailAndPassword(email, password)
			}
		} catch (error) {
			setError(error.message)
		}
	}
	const onSocialClick = async (event) => {
		const {
			target: { name },
		} = event
		let provider
		if (name === "google") {
			provider = new firebaseInstance.auth.GoogleAuthProvider()
		} else if (name === "github") {
			provider = new firebaseInstance.auth.GithubAuthProvider()
		}
		const data = await AuthService.signInWithPopup(provider)
	}
	return (
		<div className="authContainer">
			<FontAwesomeIcon
				icon={faTwitter}
				color={"#04AAFF"}
				size="3x"
				style={{ marginBottom: 30 }}
			/>
			<div>
				<form onSubmit={onSubmit} className="container">
					<input
						name="email"
						type="email"
						placeholder="Email"
						required
						value={email}
						onChange={onChange}
						className="authInput"
					/>
					<input
						name="password"
						type="password"
						placeholder="Password"
						required
						value={password}
						onChange={onChange}
						className="authInput"
					/>
					<input
						type="submit"
						value={newAccount ? "Create Account" : "Log In"}
						onClick={onSubmit}
						className="authSubmit"
					/>
					{error && <span className="authError">{error}</span>}
				</form>
				<span onClick={toggleAccount} className="authSwitch">
					{newAccount ? "Sign in" : "Create Account"}
				</span>

				<div className="authBtns">
					<button onClick={onSocialClick} name="google" className="authBtn">
						Continue with Google <FontAwesomeIcon icon={faGoogle} />
					</button>
					<button onClick={onSocialClick} name="github" className="authBtn">
						Continue with Github <FontAwesomeIcon icon={faGithub} />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Auth

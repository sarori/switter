import React, { useState, useEffect } from "react"
import { dbService } from "../fbase"
// import { firebaseInstance } from "../fbase"

const Home = () => {
	const [sweet, setSweet] = useState("")
	const [sweets, setSweets] = useState([])
	const getSweet = async () => {
		const dbSweet = await dbService.collection("sweets").get()
		dbSweet.forEach((document) => {
			setSweets((prev) => [document.data(), ...prev])
		})
	}
	useEffect(() => {
		getSweet()
	}, [])

	const onSubmit = async (event) => {
		event.preventDefault()
		await dbService.collection("sweets").add({
			sweet,
			createAt: Date.now(),
		})
		setSweet("")
	}
	const onChange = (event) => {
		const {
			target: { value },
		} = event
		setSweet(value)
	}
	return (
		<>
			<h3>Nweeting</h3>
			<form onSubmit={onSubmit}>
				<input type="text" value={sweet} onChange={onChange} placeholder="Share your day" />
				<input type="submit" value="submit" />
			</form>
			<div key={sweet.id}>
				{sweets.map((sweet) => (
					<h4>{sweet.sweet}</h4>
				))}
			</div>
		</>
	)
}

export default Home

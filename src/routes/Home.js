import React, { useState, useEffect } from "react"
import { dbService } from "../fbase"
import Sweet from "../components/Sweet"

const Home = () => {
	const [sweet, setSweet] = useState("")
	const [sweets, setSweets] = useState([])
	const getSweet = async () => {
		const dbSweet = await dbService.collection("sweets").get()
		dbSweet.forEach((document) => {
			const sweetObject = {
				...document.data(),
				id: document.id,
			}
			setSweets((prev) => [sweetObject, ...prev])
		})
	}
	useEffect(() => {
		getSweet()
	}, [])
	const onSubmit = async (event) => {
		event.preventDefault()
		const user = await dbService.collection("sweets").add({
			sweet,
			createdAt: Date.now(),
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
				<input
					type="text"
					value={sweet}
					onChange={onChange}
					placeholder="Share your day"
					max={150}
				/>
				<input type="submit" value="submit" />
			</form>
			<div>
				{sweets.map((sweet) => (
					<div key={sweet.id}>
						<h4>{sweet.sweet}</h4>
					</div>
				))}
			</div>
			<Sweet sweet={sweet} />
		</>
	)
}

export default Home

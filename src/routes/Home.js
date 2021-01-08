import React, { useState, useEffect } from "react"
import { dbService } from "../fbase"
import Sweet from "../components/Sweet"

const Home = ({ userObj }) => {
	const [sweet, setSweet] = useState("")
	const [sweets, setSweets] = useState([])
	useEffect(() => {
		dbService.collection("sweets").onSnapshot((snapshot) => {
			const sweetArray = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}))
			setSweets(sweetArray)
		})
	}, [])
	const onSubmit = async (event) => {
		event.preventDefault()
		await dbService.collection("sweets").add({
			text: sweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
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
		<div>
			<h3>Nweeting</h3>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					value={sweet}
					onChange={onChange}
					placeholder="Share your day"
					max={150}
				/>
				<input type="submit" value="Sweet" />
			</form>
			<div>
				{sweets.map((sweet) => (
					<Sweet
						key={sweet.id}
						sweetObj={sweet}
						isOwner={sweet.creatorId === userObj.uid}
					/>
				))}
			</div>
		</div>
	)
}

export default Home

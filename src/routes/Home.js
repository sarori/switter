import React, { useState, useEffect } from "react"
import { dbService, storageService } from "../fbase"
import Sweet from "../components/Sweet"
import { v4 as uuidv4 } from "uuid"

const Home = ({ userObj }) => {
	const [sweet, setSweet] = useState("")
	const [sweets, setSweets] = useState([])
	const [attachment, setAttachment] = useState()
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

		const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
		const response = await fileRef.putString(attachment, "data_url")
		console.log(response)
		await dbService.collection("sweets").add({
			text: sweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachment: attachment,
		})
		setSweet("")
	}
	const onChange = (event) => {
		const {
			target: { value },
		} = event
		setSweet(value)
	}
	const onAttachmentClick = (event) => {
		const {
			target: { files },
		} = event
		const theFile = files[0]
		const reader = new FileReader()
		reader.onloadend = (finishedEvent) => {
			const {
				currentTarget: { result },
			} = finishedEvent
			setAttachment(result)
		}
		reader.readAsDataURL(theFile)
	}
	const onClearAttachment = () => {
		setAttachment(null)
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
				<input type="file" accept="image/*" onChange={onAttachmentClick} />
				<input type="submit" value="Sweet" />
				{attachment && (
					<div>
						<img src={attachment} width="50px" height="50px" />
						<button onClick={onClearAttachment}>Clear</button>
					</div>
				)}
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

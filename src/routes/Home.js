import React, { useState, useEffect } from "react"
import { dbService, storageService } from "../fbase"
import Sweet from "../components/Sweet"
import { v4 as uuidv4 } from "uuid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"

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
		setAttachment("")
	}
	return (
		<div className="container">
			<h3>Nweeting</h3>
			<form onSubmit={onSubmit} className="factoryForm">
				<div className="factoryInput__container">
					<input
						className="factoryInput__input"
						type="text"
						value={sweet}
						onChange={onChange}
						placeholder="Share your day"
						max={150}
					/>
					<input type="submit" value="&rarr;" className="factoryInput__arrow" />
				</div>
				<label for="attach-file" className="factoryInput__label">
					<span>Add photos</span>
					<FontAwesomeIcon icon={faPlus} />
				</label>
				{/* <input type="file" accept="image/*" onChange={onAttachmentClick} /> */}
				{/* <input type="submit" value="Sweet" /> */}
				<input
					id="attach-file"
					type="file"
					accept="image/*"
					onChange={onAttachmentClick}
					style={{
						opacity: 0,
					}}
				/>
				{attachment && (
					<div className="factoryForm__attachment">
						<img
							src={attachment}
							width="50px"
							height="50px"
							style={{
								backgroundImage: attachment,
							}}
						/>
						<button onClick={onClearAttachment}>Clear</button>
					</div>
				)}
				<div className="factoryForm__clear" onClick={onClearAttachment}>
					<span>Remove</span>
					<FontAwesomeIcon icon={faTimes} />
				</div>
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

import { useState } from "react"
import { dbService, storageService } from "../fbase"
import { v4 as uuidv4 } from "uuid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"

const SweetMaking = ({ userObj }) => {
	const [sweet, setSweet] = useState("")
	const [attachment, setAttachment] = useState("")
	const onChange = (event) => {
		const {
			target: { value },
		} = event
		setSweet(value)
	}
	const onSubmit = async (event) => {
		if (sweet === "") {
			return
		}
		event.preventDefault()
		let attachmentUrl = ""
		if (attachment !== "") {
			const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
			const response = await attachmentRef.putString(attachment, "data_url")
			attachmentUrl = await response.ref.getDownloadURL()
		}
		const sweetObj = {
			text: sweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachmentUrl,
		}
		await dbService.collection("sweets").add(sweetObj)
		setSweet("")
		setAttachment("")
	}
	const onFileChange = (event) => {
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
		if (Boolean(theFile)) {
			reader.readAsDataURL(theFile)
		}
	}
	const onClearAttachment = () => {
		setAttachment("")
	}
	return (
		<form onSubmit={onSubmit} className="factoryForm">
			<div className="factoryInput__container">
				<input
					onChange={onChange}
					value={sweet}
					type="text"
					placeholder="Share your day"
					maxLength={120}
					className="factoryInput__input"
				/>
				<input type="submit" value="&rarr;" className="factoryInput__arrow" />
			</div>
			<label htmlFor="attach-file" className="factoryInput__label">
				<span>add photos</span>
				<FontAwesomeIcon icon={faPlus} />
			</label>
			<input
				id="attach-file"
				type="file"
				accept="image/*"
				onChange={onFileChange}
				style={{
					opacity: 0,
				}}
			/>
			{attachment && (
				<div className="factoryForm__attachment">
					<img
						src={attachment}
						style={{
							backgroundImage: attachment,
						}}
					/>
					<div className="factoryForm__clear" onClick={onClearAttachment}>
						<span>Remove</span>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
			)}
		</form>
	)
}

export default SweetMaking

import { useState } from "react"
import { dbService, storageService } from "../fbase"
import { v4 as uuidv4 } from "uuid"

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
	return (
		<form onSubmit={onSubmit}>
			<div>
				<input
					onChange={onChange}
					value={sweet}
					type="text"
					placeholder="Share your day"
					maxLength={120}
				/>
				<input type="submit" value="upload" />
			</div>
		</form>
	)
}

export default SweetMaking

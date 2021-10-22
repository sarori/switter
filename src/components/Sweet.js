import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { dbService } from "../fbase"

const Sweet = ({ isOwner, sweetObj }) => {
	const [editing, setEditing] = useState(false)
	const [newSweet, setNewSweet] = useState(sweetObj.text)
	const onDeleteClick = async (event) => {
		const ok = window.confirm("Do you wanna delete?")
		if (ok) {
			await dbService.doc(`sweets/${sweetObj.id}`).delete()
		}
	}
	const onSubmit = async (event) => {
		event.preventDefault()
		const updateData = await dbService.doc(`sweets/${sweetObj.id}`)
		updateData.update({
			text: newSweet,
		})
		toToggle(editing)
	}
	const toToggle = () => {
		setEditing((prev) => !prev)
	}
	const onChange = (event) => {
		const {
			target: { value },
		} = event
		setNewSweet(value)
	}

	return (
		<>
			<div className="nweet">
				{editing ? (
					<>
						<form onSubmit={onSubmit} className="container nweetEdit">
							<input
								type="text"
								value={newSweet}
								required
								autoFocus
								onChange={onChange}
								className="formInput"
							/>
						</form>
						<span onClick={onSubmit} className="formBtn">
							Update
						</span>
						<span onClick={toToggle} className="nweet__actions">
							Cancle
						</span>
					</>
				) : (
					<>
						<h4>{sweetObj.text}</h4>
						{sweetObj.attachmentUrl && <img src={sweetObj.attachmentUrl} />}
						{isOwner && (
							<div className="nweet__actions">
								<span onClick={toToggle}>
									<FontAwesomeIcon icon={faPencilAlt} />
								</span>
								<span onClick={onDeleteClick}>
									<FontAwesomeIcon icon={faTrash} />
								</span>
							</div>
						)}
					</>
				)}
			</div>
		</>
	)
}

export default Sweet

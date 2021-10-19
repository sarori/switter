import React, { useState } from "react"
import { dbService } from "../fbase"

const Sweet = ({ isOwner, sweetObj }) => {
	const [editing, setEditing] = useState(false)
	const [newSwitter, setNewSwitter] = useState(sweetObj.text)
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
			text: newSwitter,
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
		setNewSwitter(value)
	}

	return (
		<>
			<div>{editing ? <>{/* //취소 완료 */}</> : <>{/* edit, 삭제 */}</>}</div>
		</>
	)
}

export default Sweet

import React from "react"
import { dbService } from "../fbase"

const Sweet = ({ isOwner, sweetObj }) => {
	const onClick = async (event) => {
		const {
			target: { name },
		} = event
		if (name === "update") {
			//update
		} else if (name === "delete") {
			const ok = window.confirm("Do you wanna delete?")
			if (ok) {
				await dbService.doc(`sweets/${sweetObj.id}`).delete()
			}
		}
	}
	return (
		<>
			{isOwner ? (
				<>
					<div key={sweetObj.id}>
						<h4>{sweetObj.text}</h4>
					</div>
					<div>
						<button type="button" name="update" onClick={onClick}>
							update
						</button>
						<button type="button" name="delete" onClick={onClick}>
							delete
						</button>
					</div>
				</>
			) : (
				<>
					<div key={sweetObj.id}>
						<h4>{sweetObj.text}</h4>
					</div>
				</>
			)}
		</>
	)
}

export default Sweet

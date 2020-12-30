import React from "react"

const Sweet = ({ sweets }) => {
	const onClick = (event) => {
		const {
			target: { name },
		} = event
		if (name === "update") {
			//update
		} else if (name === "delete") {
			const ok = window.confirm("Do you wanna update?")
			if (ok) {
				// delete
			}
		}
	}
	return (
		<>
			<div>
				<button type="button" name="update" onClick={onClick}>
					update
				</button>
				<button type="button" name="delete" onClick={onClick}>
					delete
				</button>
			</div>
		</>
	)
}

export default Sweet

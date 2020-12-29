import React from "react"

const Sweet = ({ sweets }) => {
	const onSubmit = (event) => {
		const {
			target: { name },
		} = event
		console.log(name)
		if (name === "update") {
			//update
		} else if (name === "delete") {
			console.log("a")
			window.alert("Do you wanna update?")
		}
	}
	return (
		<>
			<div>
				<button name="update" onSubmit={onSubmit}>
					update
				</button>
				<button name="delete" onSubmit={onSubmit}>
					delete
				</button>
			</div>
		</>
	)
}

export default Sweet

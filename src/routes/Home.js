import { useEffect, useState } from "react"
import { dbService } from "../fbase"
import Sweet from "../components/Sweet"
import SweetMaking from "../components/SweetMaking"

const Home = ({ userObj }) => {
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
	return (
		<div className="container">
			<SweetMaking userObj={userObj} />
			<div style={{ marginTop: 30 }}>
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

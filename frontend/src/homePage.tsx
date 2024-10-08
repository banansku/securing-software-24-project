import { useEffect, useState } from "react"
import { useAuth } from "./Contexts/AuthContext";
import axios from "axios";
import { url } from "./App";

function LoginPage() {

	const { logoutUser, userInfo } = useAuth();

	const [count, setCount] = useState(0)

	useEffect(() => {
		if (userInfo) {
			console.log(userInfo)
			axios.get(`${url}/clicks/${userInfo?.id}`).then(resp => {
				console.log(resp)
				setCount(resp.data.clicks)
			})
		}
	}, [userInfo])

	const [searchTerm, setSearchTerm] = useState<string>()

	const handleClick = () => {
		axios.post(`${url}/clicks/${userInfo?.id}`).then(() => setCount(count + 1))
	}

	const searchPlayer = () => {
		console.log(searchTerm)
	}

	const searchTermOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}


	return (
		<>
			{!!userInfo && <><h1>Welcome to Clicker!</h1>
				<div className="row">
					<button onClick={handleClick}>
						count is {count}
					</button>
				</div>
				<br />
				<div className="row">
					<div>Find another players count:</div>
					<input type="string" onChange={searchTermOnChange} /> <button onClick={searchPlayer}>search</button>
				</div>
				<br />
				<div className="row">
					<button onClick={logoutUser}>Log Out</button>
				</div></>}
		</>
	)
}

export default LoginPage

import { useState } from "react"
import { useAuth } from "./Contexts/AuthContext";

function LoginPage() {

  const { logoutUser } = useAuth();

  const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState<string>()

  const searchPlayer = () => {
    console.log(searchTerm)
  }

  const searchTermOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }


  return (
    <>
      <h1>Welcome to Clicker!</h1>
      <div className="row">
        <button onClick={() => setCount((count) => count + 1)}>
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
      </div>
    </>
  )
}

export default LoginPage

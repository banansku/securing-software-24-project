import { useState } from "react"
import { useAuth } from "./Contexts/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { url } from "./App";

function SignUpPage() {
    const { loginUser, isAuthenticated } = useAuth();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const usernameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const signUp = () => {
        axios.post(`${url}/user`, { username: username, password: password })
            .then(() => loginUser(username, password))
            .catch(e => console.log(e))
    }
    return (
        <>
            {!isAuthenticated &&
                <>
                    <h1>Welcome to Clicker!</h1>
                    <h2>Please Sign Up to Continue</h2>
                    <form onSubmit={signUp}>
                        <input onChange={usernameOnChange} type="text" />
                        <input onChange={passwordOnChange} type="password" />
                        <button type="button" onClick={signUp}>Sign Up</button>
                    </form>
                </>
            }
            {isAuthenticated && <Navigate to="/homepage" replace />}
        </>
    )
}

export default SignUpPage

import { useState } from "react"
import { useAuth } from "./Contexts/AuthContext";
import { Navigate } from "react-router-dom";

function LoginPage() {
    const { loginUser, isAuthenticated } = useAuth();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const passwordOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const usernameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const login = () => {
        loginUser(username, password)
    }

    return (
        <>
            {!isAuthenticated &&
                <>
                    <h1>Welcome to Clicker!</h1>
                    <h2>Please Login to Continue</h2>
                    <form onSubmit={login}>
                        <input onChange={usernameOnChange} type="text" />
                        <input onChange={passwordOnChange} type="password" />
                        <button type="button" onClick={login}>Login</button>
                    </form>
                    <br />
                    <a href="/signup">
                        <h2>Click here to sign up</h2>
                    </a>
                </>
            }
            {isAuthenticated && <Navigate to="/homepage" replace />}
        </>
    )
}

export default LoginPage

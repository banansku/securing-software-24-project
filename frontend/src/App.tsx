import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Contexts/AuthContext'
import PrivateRoute from './privateRoute'
import LoginPage from './loginPage'
import HomePage from './homePage'
import SignUpPage from './signUp'

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/homepage" element={<HomePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App

import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPage from './components/UserForm.jsx'
import OrganisationPage from './components/OrganisationPage.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to PovAware</h1>} />
        <Route path="/userpage" element={<UserPage/>} />
        <Route path="/organisationpage" element={<OrganisationPage/>} />
      </Routes>
    </Router>
  )
}

export default App

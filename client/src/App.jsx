import { useState } from 'react'
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from './components/auth'
import Navbar from './components/navbar'
import Posts from './components/posts'
import './App.css'

function App() {

  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(true);

  return (

    <div>
      <BrowserRouter>
        <Navbar showAuth={showAuth} setShowAuth={setShowAuth}  />

        <Routes>
          <Route path='/auth' element={<Auth user={user} setUser={setUser} showAuth={showAuth} setShowAuth={setShowAuth} />} />
          <Route path='/' element={<Posts />} />
        </Routes>

      </BrowserRouter>
    </div>
    
  )
}

export default App

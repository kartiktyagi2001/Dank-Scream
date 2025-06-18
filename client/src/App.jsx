import { useState } from 'react'
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from './components/auth'
import Navbar from './components/navbar'
import Posts from './components/posts'
import './App.css'

function App() {

  return (

    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/' element={<Posts />} />
        </Routes>

      </BrowserRouter>
    </div>
    
  )
}

export default App

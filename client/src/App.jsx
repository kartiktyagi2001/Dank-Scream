import { useState } from 'react'
import{BrowserRouter} from 'react-router-dom'
import Auth from './components/auth'
import Navbar from './components/navbar'
import './App.css'

function App() {

  return (

    <div>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>

      <Auth />
    </div>
    
  )
}

export default App

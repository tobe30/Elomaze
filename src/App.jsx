import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import PropertyListing from './pages/property/PropertyListing'

const App = () => {
  return (
    <div>
      <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/listings' element={<PropertyListing/>}/>

      </Routes>
    </div>
  )
}

export default App
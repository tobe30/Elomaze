import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import PropertyListing from './pages/property/PropertyListing'
import PropertyDetail from './pages/property/PropertyDetail'
import Roomates from './pages/roomates/Roomates'
import RoommateDetail from './pages/roomates/RoommateDetail'
import Services from './pages/Services/Services'
import ServiceDetail from './pages/Services/ServiceDetail'
import Layout from './components/Layouts'

const App = () => {
  return (
    <div>
      <Routes>
        
         <Route element={<Layout />}>
            <Route path='/' element={<Home/>}/>
            <Route path='/listings' element={<PropertyListing/>}/>
            <Route path="/listing/:id" element={<PropertyDetail />} />
            <Route path="/roomates/" element={<Roomates />} />
            <Route path="/roommates/:id" element={<RoommateDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
        </Route>





      </Routes>
    </div>
  )
}

export default App
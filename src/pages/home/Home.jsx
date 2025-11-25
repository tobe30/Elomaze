import React from 'react'
import Hero from '../../components/Hero'
import Navbar from '../../components/Navbar'
import FeaturedListings from '../../components/FeaturedListing'
import NearListings from '../../components/NearListings'
import FindRoommates from '../../components/FindRoomates'
import ServiceCard from '../../components/Service'
import Footer from '../../components/Footer'
// import HomePage from '../components/HomePage'
const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <FeaturedListings/>
        <NearListings/>
        <FindRoommates/>
        <ServiceCard/>
        <Footer/>

        {/* <HomePage/>    */}
    </div>
  )
}

export default Home
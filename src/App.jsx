// src/App.jsx
import { useState, useEffect } from 'react'
import ChatBot from 'react-chatbotify'
import { Route, Routes } from 'react-router-dom'
import { DarkModeProvider } from './contexts/DarkModeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import AboutUs from './pages/AboutUs'
import Contacts from './pages/Contacts'
import AddCountry from './pages/AddCountry'
import AddHotel from './pages/AddHotel'
import AddPlace from './pages/AddPlace'
import BookFlight from './components/BookFlight'
import BookHotel from './components/BookHotel'
import UserBlog from './components/UserBlog'
import FlightTracking from './components/FlightTracking'
import Countries from './pages/Countries'
// import CommunityChat from './components/CommunityChat'
import EditHotel from './pages/EditHotel'
import EditPlace from './pages/EditPlace'
import { CheckSession } from './services/Auth'
import './App.css'
import Gallery from './pages/Gallery'
import HotelDetails from './pages/HotelDetails'
import PlaceDetails from './pages/PlaceDetails'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    try {
      const user = await CheckSession()
      setUser(user)
    } catch (error) {
      console.error('Session check failed:', error)
      handleLogOut()
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])
  const flow = {
    start: {
      message: 'Hello Travelers!',
      path: 'ask_where'
    },
    ask_where: {
      message:
        'Here is a list of the hot destinations of 2025, 1. Moscow, Russia. 2. Lapland Finland',
      path: 'ask_when'
    },
    ask_when: {
      message: 'Which season are you thinking?',
      path: 'ask_more'
    },
    ask_more: {
      message: 'Anything else?'
    }

    // start: {
    //   message: 'Where are you thinking?'
    // }
  }

  return (
    <DarkModeProvider>
      <div className="App">
        <>
          <div></div>
          <ChatBot flow={flow} />
        </>
        <Routes>
          <Route
            path="/"
            element={<Layout user={user} handleLogOut={handleLogOut} />}
          >
            <Route index element={<Home user={user} />} />
            <Route path="sign-in" element={<SignIn setUser={setUser} />} />
            <Route path="register" element={<Register />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="add-country" element={<AddCountry />} />
            <Route path="add-hotel" element={<AddHotel />} />
            <Route path="add-place" element={<AddPlace />} />
            <Route path="book-flight" element={<BookFlight />} />
            <Route path="book-hotel" element={<BookHotel />} />
            <Route path="user-blog" element={<UserBlog />} />
            <Route path="flight-tracking" element={<FlightTracking />} />
            <Route path="countries" element={<Countries />} />
            {/* <Route path="community-chat" element={<CommunityChat />} /> */}
            <Route path="edit-hotel/:id" element={<EditHotel />} />
            <Route path="edit-place/:id" element={<EditPlace />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="hotel-details/:id" element={<HotelDetails />} />
            <Route path="place-details/:id" element={<PlaceDetails />} />
          </Route>
        </Routes>
      </div>
    </DarkModeProvider>
  )
}

export default App

import React, { useState, useEffect } from 'react'
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
import CommunityChat from './components/CommunityChat'
import EditHotel from './pages/EditHotel'
import EditPlace from './pages/EditPlace'
import { CheckSession } from './services/Auth'
import './App.css'
import Gallery from './pages/Gallery'
import HotelDetails from './pages/HotelDetails'
import PlaceDetails from './pages/PlaceDetails'
import CountryDetails from './pages/CountryDetails'

const App = () => {
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({})

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
      ;(async () => {
        await checkToken()
      })()
    }
  }, [])

  const flow = {
    start: {
      message: () => {
        const seenBefore = localStorage.getItem('example_welcome')
        if (seenBefore) {
          return `Welcome back ${seenBefore}!`
        }
        return "Welcome there :wave:! It's Travel Trove, what is your name?"
      },
      function: (params) =>
        localStorage.setItem('example_welcome', params.userInput),
      path: 'say_assist'
    },
    say_assist: {
      message: (params) =>
        `Great knowing you ${params.userInput}, how can I assist you today?`,
      path: 'ask_option1'
    },
    ask_option1: {
      message:
        'Would you like recommendations for trending destinations in 2025?',
      options: ['Yes', 'No'],
      function: (params) =>
        setForm({ ...form, travel_ownership: params.userInput }),
      path: 'ask_choice'
    },
    ask_choice: {
      message: 'Select at least 2 activities you are interested in:',
      checkboxes: {
        items: [
          'Theme Parks',
          'Adrenaline Rush',
          'Leisure tourism',
          'Cultural Tourism'
        ],
        min: 2
      },
      function: (params) => setForm({ ...form, pet_choices: params.userInput }),
      path: 'ask_work_days'
    },
    ask_work_days: {
      message: 'Which season do you prefer?',
      checkboxes: {
        items: ['Winter', 'Summer', 'Autumn', 'Spring'],
        max: 2
      },
      function: (params) =>
        setForm({ ...form, num_work_days: params.userInput }),
      path: 'ask_cont'
    },
    ask_cont: {
      message: 'Where in the world?',
      checkboxes: {
        items: ['Asia', 'Europe', 'Americas', 'Austrilia'],
        max: 2
      },
      function: (params) =>
        setForm({ ...form, num_work_days: params.userInput }),
      path: 'end'
    },
    end: {
      message: 'These are the best fits for you!',
      component: (
        <div>
          <p>Activities: {form.pet_choices}</p>
          <p>Season: {form.num_work_days}</p>
        </div>
      ),
      options: ['New Application'],
      chatDisabled: true,
      path: 'start'
    }
  }

  return (
    <DarkModeProvider>
      <div className="App">
        <ChatBot
          settings={{
            voice: { disabled: false },
            botBubble: { simStream: true },
            chatHistory: { storageKey: 'example_basic_form' }
          }}
          flow={flow}
        />
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
            <Route path="community-chat" element={<CommunityChat />} />
            <Route path="edit-hotel/:id" element={<EditHotel />} />
            <Route path="edit-place/:id" element={<EditPlace />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="hotel-details/:id" element={<HotelDetails />} />
            <Route path="place-details/:id" element={<PlaceDetails />} />
            <Route path="country-details/:id" element={<CountryDetails />} />
          </Route>
        </Routes>
      </div>
    </DarkModeProvider>
  )
}

export default App

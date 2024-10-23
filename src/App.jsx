// src/App.jsx

import { useState, useEffect } from 'react'
import ChatBot from 'react-chatbotify'
import { useNavigate, Route, Routes } from 'react-router-dom'
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
import Profile from './pages/Profile'
const App = () => {
  const [user, setUser] = useState(null)
  let navigate = useNavigate()

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
    navigate('/')
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

  //   // Save chatbot state to localStorage
  //   useEffect(() => {
  //     localStorage.setItem("botState", JSON.stringify(botState));
  //   }, [botState]);

  //   const handleOptionClick = (key, value) => {
  //     setBotState((prev) => ({ ...prev, [key]: value }));
  //   };

  //   const goToPage = useCallback((path) => navigate(path), [navigate]);

  //   const flow = {
  //     start: {
  //       message: "Hello Travelers! Ready to explore the top destinations of 2025?",
  //       options: [
  //         { text: "Yes, let’s go!", path: "ask_where" },
  //         { text: "Tell me more about your service.", path: "about_us" },
  //       ],
  //     },
  //     about_us: {
  //       message: "We help you explore the world with personalized recommendations and easy booking services!",
  //       path: "ask_where",
  //     },
  //     ask_where: {
  //       message: "Which of these hot destinations are you interested in?",
  //       options: [
  //         { text: "Moscow, Russia", path: "ask_when", onClick: () => handleOptionClick("destination", "Moscow") },
  //         { text: "Lapland, Finland", path: "ask_when", onClick: () => handleOptionClick("destination", "Lapland") },
  //         { text: "Kyoto, Japan", path: "ask_when", onClick: () => handleOptionClick("destination", "Kyoto") },
  //         { text: "New York, USA", path: "ask_when", onClick: () => handleOptionClick("destination", "New York") },
  //         { text: "Cape Town, South Africa", path: "ask_when", onClick: () => handleOptionClick("destination", "Cape Town") },
  //       ],
  //     },
  //     ask_when: {
  //       message: "Great choice! Which season would you like to visit?",
  //       options: [
  //         { text: "Winter", path: "recommendation", onClick: () => handleOptionClick("season", "Winter") },
  //         { text: "Summer", path: "recommendation", onClick: () => handleOptionClick("season", "Summer") },
  //         { text: "Spring", path: "recommendation", onClick: () => handleOptionClick("season", "Spring") },
  //         { text: "Autumn", path: "recommendation", onClick: () => handleOptionClick("season", "Autumn") },
  //       ],
  //     },
  //     recommendation: {
  //       message: () => {
  //         const { destination, season } = botState;
  //         if (!destination || !season) return "Please select a destination and season first.";

  //         const recommendations = {
  //           Moscow: {
  //             Winter: "Moscow is magical in winter with snow-covered streets and holiday markets!",
  //             Summer: "Moscow in summer is vibrant with outdoor festivals and warm evenings.",
  //           },
  //           Lapland: {
  //             Winter: "Lapland is perfect for Northern Lights and meeting Santa!",
  //             Summer: "Enjoy the midnight sun and scenic hikes in Lapland’s summer.",
  //           },
  //           Kyoto: {
  //             Spring: "Kyoto’s cherry blossoms are breathtaking in spring!",
  //             Autumn: "The autumn foliage in Kyoto is a sight to behold.",
  //           },
  //           "New York": {
  //             Winter: "Experience New York’s winter magic with ice skating and holiday lights.",
  //             Summer: "Summer in New York is perfect for rooftop dining and park events.",
  //           },
  //           "Cape Town": {
  //             Summer: "Cape Town’s beaches are a dream in summer!",
  //             Winter: "Winter in Cape Town offers amazing whale watching opportunities.",
  //           },
  //         };

  //         return recommendations[destination]?.[season] || `${destination} is wonderful in ${season}!`;
  //       },
  //       options: [
  //         { text: "Tell me more!", path: "ask_more" },
  //         { text: "Book my trip!", onClick: () => goToPage("/book-flight") },
  //       ],
  //     },
  //     ask_more: {
  //       message: "What else would you like to explore?",
  //       options: [
  //         { text: "Show me hotels.", onClick: () => goToPage("/book-hotel") },
  //         { text: "What attractions are available?", path: "ask_where" },
  //         { text: "I’m done for now.", path: "end_convo" },
  //       ],
  //     },
  //     end_convo: {
  //       message: "Thank you for using our service! Have a great trip!",
  //     },
  //   };
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

            <Route
              path="/profile"
              element={<Profile user={user} setUser={setUser} />}
            />

            <Route path="sign-in" element={<SignIn setUser={setUser} />} />
            <Route path="register" element={<Register />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="add-country" element={<AddCountry user={user} />} />
            <Route path="add-hotel" element={<AddHotel user={user} />} />
            <Route path="add-place" element={<AddPlace user={user} />} />
            <Route path="book-flight" element={<BookFlight user={user} />} />
            <Route path="book-hotel" element={<BookHotel user={user} />} />
            <Route path="user-blog" element={<UserBlog user={user} />} />
            <Route path="flight-tracking" element={<FlightTracking />} />
            <Route path="countries" element={<Countries />} />
            <Route
              path="community-chat"
              element={<CommunityChat user={user} />}
            />
            <Route path="edit-hotel/:id" element={<EditHotel user={user} />} />
            <Route path="edit-place/:id" element={<EditPlace user={user} />} />
            <Route path="gallery" element={<Gallery user={user} />} />
            <Route
              path="hotel-details/:id"
              element={<HotelDetails user={user} />}
            />
            <Route
              path="place-details/:id"
              element={<PlaceDetails user={user} />}
            />
            <Route
              path="country-details/:id"
              element={<CountryDetails user={user} />}
            />
          </Route>
        </Routes>
      </div>
    </DarkModeProvider>
  )
}

export default App

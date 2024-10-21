import { useState, useEffect } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import AddCountry from './pages/AddCountry'
import AddHotel from './pages/AddHotel'
import AddPlace from './pages/AddPlace'
import AboutUs from './pages/AboutUs'
import Contacts from './pages/Contacts'
import Gallery from './pages/Gallery'
import BookFlight from './components/BookFlight'
import BookHotel from './components/BookHotel'
// import CommunityChat from './components/CommunityChat'
import UserBlog from './components/UserBlog'
import FlightTracking from './components/FlightTracking' // Importing FlightTracking
import './App.css'
import Nav from './components/Nav'
import { CheckSession } from './services/Auth'
import EditHotel from './pages/EditHotel'
import EditPlace from './pages/EditPlace'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    //i commented the Router because we already have one in main.jsx. and using more than one Router causes errors
    // <Router>
    <div className="App">
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-country" element={<AddCountry />} />
          <Route path="/add-hotel" element={<AddHotel />} />
          <Route path="/add-place" element={<AddPlace />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/book-flight" element={<BookFlight />} />
          <Route path="/book-hotel" element={<BookHotel />} />
          {/* <Route path="/community-chat" element={<CommunityChat />} /> */}
          <Route path="/user-blog" element={<UserBlog />} />
          <Route path="/flight-tracking" element={<FlightTracking />} />

          <Route path="edit-hotel/:id" element={<EditHotel />} />
          <Route path="edit-place/:id" element={<EditPlace />} />

          {/* New Route */}
        </Routes>
      </main>
    </div>
    // </Router>
  )
}

export default App

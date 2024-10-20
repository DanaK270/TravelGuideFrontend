import { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import AddCountry from './pages/AddCountry';
import AddHotel from './pages/AddHotel';
import AddPlace from './pages/AddPlace';
import AboutUs from './pages/AboutUs';
import Contacts from './pages/Contacts';
import Gallery from './pages/Gallery';
import BookFlight from './components/BookFlight';
import BookHotel from './components/BookHotel';
import CommunityChat from './components/CommunityChat';
import UserBlog from './components/UserBlog';
import FlightTracking from './components/FlightTracking'; // Importing FlightTracking
import './App.css';
import { CheckSession } from './services/Auth';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
  };

  const checkToken = async () => {
    const user = await CheckSession();
    setUser(user);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken();
    }
  }, []);

  return (
    <Router>
      <div className="App">
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
            <Route path="/community-chat" element={<CommunityChat />} />
            <Route path="/user-blog" element={<UserBlog />} />
            <Route path="/flight-tracking" element={<FlightTracking />} /> {/* New Route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

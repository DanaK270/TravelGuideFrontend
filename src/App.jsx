// App.jsx
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import AddCountry from './pages/AddCountry';
import AddHotel from './pages/AddHotel';
import AddPlace from './pages/AddPlace';
import AboutUs from './pages/AboutUs';
import Contacts from './pages/Contacts';
import Gallery from './pages/Gallery';
import BookFlight from './components/BookFlight';
import BookHotel from './components/BookHotel';
import UserBlog from './components/UserBlog';
import FlightTracking from './components/FlightTracking';
import EditHotel from './pages/EditHotel';
import EditPlace from './pages/EditPlace';
import { CheckSession } from './services/Auth';
import './App.css';

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
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout user={user} handleLogOut={handleLogOut} />}>
          <Route index element={<Home />} />
          <Route path="sign-in" element={<SignIn setUser={setUser} />} />
          <Route path="register" element={<Register />} />
          <Route path="add-country" element={<AddCountry />} />
          <Route path="add-hotel" element={<AddHotel />} />
          <Route path="add-place" element={<AddPlace />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="book-flight" element={<BookFlight />} />
          <Route path="book-hotel" element={<BookHotel />} />
          <Route path="user-blog" element={<UserBlog />} />
          <Route path="flight-tracking" element={<FlightTracking />} />
          <Route path="edit-hotel/:id" element={<EditHotel />} />
          <Route path="edit-place/:id" element={<EditPlace />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

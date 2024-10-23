// pages/Bookmarks.jsx
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import Client from '../services/api' // Adjust based on your setup
import { useParams } from 'react-router-dom'

const Bookmarks = () => {
  const { id } = useParams()
  const [bookmarks, setBookmarks] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)
  console.log(id)

  const fetchBookmarks = async () => {
    try {
      const res = await Client.get(`/bookmark/${id}`) // Fetch bookmarks from backend
      setBookmarks(res.data)
      // setLoading(false)
    } catch (err) {
      console.error('Error fetching bookmarks:', err)
      // setError('Failed to fetch bookmarks')
      // setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookmarks()
  }, [])

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>{error}</p>

  return (
    <div className="countries-container">
      <h2 className="countries-title">Bookmarks</h2>
      <ul className="countries-list">
        {bookmarks?.map((bookmark) => (
          <li key={bookmark.id} className="country-item">
            {bookmark.place && <h3>place: {bookmark.place.name}</h3>}
            {bookmark.hotel && <h3>Hotel: {bookmark.hotel.name}</h3>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Bookmarks

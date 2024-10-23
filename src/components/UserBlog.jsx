import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserBlog = ({ user }) => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState({ title: '', content: '' })
  const userId = localStorage.getItem('userId') // Get the logged-in user's ID
  console.log('User ID:', userId)

  let navigate = useNavigate()

  // Fetch posts when the component loads
  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) {
        console.warn('User ID is null. Cannot fetch posts.')
        return
      }
      try {
        const response = await axios.get(
          `http://localhost:4000/api/blogs/${userId}`
        )
        console.log('Fetched posts:', response.data)
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
  }, [userId])

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/blogs', { ...newPost, userId })
      setNewPost({ title: '', content: '' }) // Reset the form
      // Refresh posts after adding a new one
      const response = await axios.get(`/api/blogs/${userId}`)
      setPosts(response.data)
    } catch (error) {
      console.error('Error adding post:', error)
    }
  }

  return user ? (
    <div className="blog-container">
      <h1>Your Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={newPost.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Write your post content here..."
          value={newPost.content}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Post</button>
      </form>

      <div className="blog-posts">
        {posts.map((post, index) => (
          <div key={index} className="blog-post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <>
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/sign-in')}>Sign In</button>
    </>
  )
}

export default UserBlog

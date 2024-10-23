import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserBlog = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const userId = localStorage.getItem('userId');

  let navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:4000/api/blogs/${userId}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/blogs', { ...newPost, userId });
      setNewPost({ title: '', content: '' });

      const response = await axios.get(`/api/blogs/${userId}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return user ? (
    <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <h1>Your Blog</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={newPost.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="content"
          placeholder="Write your post content here..."
          value={newPost.content}
          onChange={handleChange}
          required
          style={{ ...inputStyle, minHeight: '100px' }}
        />
        <button type="submit" style={buttonStyle}>Add Post</button>
      </form>

      <div className="blog-posts" style={{ marginTop: '20px' }}>
        {posts.map((post, index) => (
          <div key={index} className="blog-post" style={{ marginBottom: '20px' }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/sign-in')} style={buttonStyle}>
        Sign In
      </button>
    </div>
  );
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const buttonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  borderRadius: '25px',
  backgroundColor: '#6C85F7',
  color: 'black',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
};

export default UserBlog;

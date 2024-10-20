import { useState, useEffect } from 'react';
import axios from 'axios';

const UserBlog = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/api/blogs/${localStorage.getItem('userId')}`);
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/blogs', { ...newPost, userId: localStorage.getItem('userId') });
    setNewPost({ title: '', content: '' });
    const response = await axios.get(`/api/blogs/${localStorage.getItem('userId')}`);
    setPosts(response.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={newPost.content}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Post</button>
      </form>
      {posts.map((post, index) => (
        <div key={index}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default UserBlog;

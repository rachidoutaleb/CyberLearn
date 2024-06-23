import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ articleSlug }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ body: '' });

  useEffect(() => {
    axios.get(`http://localhost:8087/articles/${articleSlug}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [articleSlug]);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewComment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`http://localhost:8087/articles/${articleSlug}/comments?userId=1`, newComment)
      .then(response => setComments([...comments, response.data]))
      .catch(error => console.error('Error adding comment:', error));
  };

  const handleDelete = (commentId) => {
    axios.delete(`http://localhost:8087/articles/${articleSlug}/comments/${commentId}`)
      .then(() => setComments(comments.filter(comment => comment.id !== commentId)))
      .catch(error => console.error('Error deleting comment:', error));
  };

  return (
    <div>
      <h2 style={{ color: '#4a70ea' }}>Comments</h2>
      {comments.map(comment => (
        <div key={comment.id} style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '10px 20px',
          marginBottom: '20px'
        }}>
          <p style={{ color: '#555' }}>{comment.body}</p>
          <button onClick={() => handleDelete(comment.id)} style={{
            backgroundColor: '#4a70ea',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}>Delete Comment</button>
        </div>
      ))}
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <textarea
          name="body"
          value={newComment.body}
          onChange={handleChange}
          placeholder="Comment Body"
          style={{ width: '98%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        ></textarea>
        <button type="submit" style={{
          backgroundColor: '#4a70ea',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}>Add Comment</button>
      </form>
    </div>
  );
};

export default Comments;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import './Article.css';

const Article = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8087/articles/${slug}`)
      .then(response => {
        setArticle(response.data);
        // Check if the current user has liked this article
        axios.get(`http://localhost:8087/articles/${slug}/liked`)
          .then(response => setLiked(response.data.liked))
          .catch(error => console.error('Error checking like status:', error));
      })
      .catch(error => console.error('Error fetching article:', error));
  }, [slug]);

  const handleLike = () => {
    axios.post(`http://localhost:8087/articles/${slug}/like`)
      .then(() => {
        setLiked(!liked);
      })
      .catch(error => console.error('Error liking article:', error));
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:8087/articles/${slug}`)
      .then(response => {
        console.log('Article deleted:', response.data);
        navigate('/');
      })
      .catch(error => console.error('Error deleting article:', error));
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container article">
      <h1>{article.title}</h1>
      <p className='ar'>{article.body}</p>
      <button class="mv" onClick={handleDelete}>Delete Post</button>
      <Comments articleSlug={slug} />
    </div>
  );
};

export default Article;

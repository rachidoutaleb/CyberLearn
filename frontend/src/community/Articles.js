import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let url = `http://localhost:8087/articles?page=${page}&size=10`;
    if (author) url += `&author=${author}`;
    if (title) url += `&title=${title}`;
    if (body) url += `&body=${body}`;

    axios.get(url)
      .then(response => {
        setArticles(response.data.articles);
        setTotalPages(response.data.totalPages);
        setTotalArticles(response.data.totalArticles);
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, [author, title, body, page]);

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
    setPage(1);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setPage(1);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
    setPage(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleCreateArticle = () => {
    navigate('/user/community/create-article');
  };

  return (
    <div className="article" style={{marginLeft:'80px'}}>
      <h1 style={{color:'#4a70ea;'}}>Community</h1>
      <div className="filters">
        <input
        class="chrch"
          type="text"
          placeholder="Filter by author"
          value={author}
          style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', backgroundColor:'white'}}
          onChange={handleAuthorChange}
        />
        <input
        class="chrch chrch1"
          type="text"
          placeholder="Filter by title"
          value={title}
          style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', backgroundColor:'white'}}
          onChange={handleTitleChange}
        />
        <input
        class="chrch chrch1"
          type="text"
          placeholder="Filter by content"
          value={body}
          style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px', backgroundColor:'white'}}
          onChange={handleBodyChange}
        />
        <div class="b-t-n">
          <button class='butt' onClick={handleCreateArticle}>Create Post</button>
        </div>
        
      </div>
      <div className="total-articles">
        <p>Available Posts: {totalArticles}</p>
      </div>
      <div className="articles">
        {articles.map(article => (
          <div key={article.id} className="article-card">
            <Link to={`/user/community/articles/${article.slug}`}>
              <h2>{article.title}</h2>
            </Link>
            <p>{article.body}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button class='butt' onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <span class="spann">Page {page} of {totalPages}</span>
        <button class='butt' onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Articles;

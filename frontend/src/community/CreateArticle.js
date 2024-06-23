import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateArticle.css';  // Assurez-vous d'importer le fichier CSS

const CreateArticle = () => {
  const [article, setArticle] = useState({ title: '', slug: '', body: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:8087/articles?userId=1', article)
      .then(response => {
        console.log('Article created:', response.data);
        navigate('/user/community/articles');
      })
      .catch(error => console.error('Error creating article:', error));
  };

  return (
    <div className="frm">
      <h1>Create Post</h1>
      <form className="create-article-form" onSubmit={handleSubmit}>
        <input
          className="ipt"
          type="text"
          name="title"
          value={article.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          className="ipt"
          type="text"
          name="slug"
          value={article.slug}
          onChange={handleChange}
          placeholder="descriptif"
        />
        <textarea
          className="ipt1"
          name="body"
          value={article.body}
          onChange={handleChange}
          placeholder="Body"
        ></textarea>
        <div className="button-container">
          <button className="btnn" type="submit">Create Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;

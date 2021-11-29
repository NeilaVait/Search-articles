import { useState, useEffect } from 'react';
import style from '../styles/Home.module.css';
import axios from 'axios';
import ArticleList from '../components/ArticleList';
import { addNewKeywords } from './../utils/requests';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [errorMsg, setErrorMsg] = useState('');

  const regex = new RegExp('^[a-zA-Z0-9 ]*$');

  const handleSearch = (e) => {
    clearArticles();
    if (!inputValid(inputValue)) {
      setErrorMsg('Search term can only contain letters, numbers and spaces');
      return;
    }
    getArticlesByInputValue(inputValue);
    handleCreateNewKeywords(inputValue);
  };

  const handleCreateNewKeywords = async (dataToSend) => {
    await addNewKeywords({ keywords: dataToSend });
  };

  const clearArticles = () => {
    setFilteredArticles([]);
    setErrorMsg('');
  };

  const getArticlesByInputValue = (value) => {
    axios(`https://gnews.io/api/v4/search?q=${value}&token=4ea0908208ea082c0ad7ce597db26e00`)
      .then((response) => {
        setArticles(response.data.articles);
        setFilteredArticles(response.data.articles.slice(0, 9));
      })
      .catch((error) => {
        console.log('Error getting data: ' + error);
      });
  };

  const inputValid = (value) => {
    if (regex.test(value)) {
      return true;
    }
    return false;
  };

  const searchStyle = {
    maxWidth: 600,
    marginRight: 'auto',
    marginLeft: 'auto',
  };

  return (
    <div className={style.container}>
      {errorMsg && <p className={style.msg}>{errorMsg}</p>}
      <div className="input-group mb-5 mt-5" style={searchStyle}>
        <button onClick={handleSearch} type="button" className="btn btn-success">
          Search
        </button>
        <input
          maxLength="40"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
      <div>
        <ArticleList articles={filteredArticles} />
      </div>
    </div>
  );
}

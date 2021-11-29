import style from '../styles/ArticleItem.module.css';
import { useState } from 'react';
import { addClickedArticleDetails } from '../utils/requests';

function ArticleItem({ article }) {
  const [articleDetails, setArticleDetails] = useState({});

  const propsToState = ({ publishedAt, title, description }) => {
    setArticleDetails({ publishedAt: publishedAt.slice(0, 10), title, description });
  };

  const handleClickedArticleDetails = async (details) => {
    await addClickedArticleDetails(details);
  };

  const truncateDescription = (description, length) => {
    if (description.length > length) {
      return description.slice(0, length) + '...';
    } else {
      return description;
    }
  };

  const openArticle = (url) => {
    propsToState(article);
    handleClickedArticleDetails(articleDetails);
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <li onClick={() => openArticle(article.url)} className={style.card}>
      <img src={article.image} alt="" />
      <h4>{article.title}</h4>
      <p>{truncateDescription(article.description, 90)}</p>
      <p className={style.date}>{article.publishedAt.slice(0, 10)}</p>
    </li>
  );
}

export default ArticleItem;

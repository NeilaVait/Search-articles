import style from '../styles/ArticleItem.module.css';
import { addClickedArticleDetails } from '../utils/requests';

function ArticleItem({ article }) {
  const handleClickedArticleDetails = async (article) => {
    const dataToSend = {
      publishedAt: article.publishedAt,
      title: article.title,
      description: article.description,
    };

    await addClickedArticleDetails(dataToSend);
  };

  const truncateDescription = (description, length) => {
    if (description.length > length) {
      return description.slice(0, length) + '...';
    } else {
      return description;
    }
  };

  const openArticle = (url) => {
    handleClickedArticleDetails(article);
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

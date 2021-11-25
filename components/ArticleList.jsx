import ArticleItem from './ArticleItem';
import style from '../styles/ArticleList.module.css';

function ArticleList({ articles }) {
  return (
    <ul className={style.container}>
      {articles.map((a) => (
        <ArticleItem key={a.url} article={a} />
      ))}
    </ul>
  );
}

export default ArticleList;

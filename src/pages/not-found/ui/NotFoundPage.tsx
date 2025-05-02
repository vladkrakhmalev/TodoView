import { FC } from 'react';
import { Link } from 'react-router';
import { routerConfig } from '@shared/config/router';
import './NotFoundPage.css';

const NotFoundPage: FC = () => {
  return (
    <div className="not-found-page">
      <h1 className="not-found-title">404.</h1>
      <h2 className="not-found-subtitle">Страница не найдена</h2>
      <p className="not-found-text">
        Похоже, что страница, которую вы ищете, не существует или была перемещена.
      </p>
      <Link 
        to={routerConfig.today} 
        className="not-found-button"
      >
        Вернуться на главную
      </Link>
    </div>
  );
}; 

export default NotFoundPage;
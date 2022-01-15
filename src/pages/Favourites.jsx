import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favourites() {
  const { favourites, onAddToFavourite } = React.useContext(AppContext);
  return (
    <div className="content">
      <div className="searchWrapper">
        <h1>Закладки</h1>
      </div>
      <div className="sneakers">
        {favourites.map((item, index) => (
          <Card key={index} favourited={true} onFavourite={onAddToFavourite} {...item} />
        ))}
      </div>
    </div>
  );
} //фикс маркера избранных

export default Favourites;

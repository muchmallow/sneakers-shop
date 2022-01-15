import React from 'react';
import Card from '../components/Card';

function Home({
  items,
  favourites,
  searchValue,
  onSearchClear,
  onChangeSearchInput,
  onAddToFavourite,
  onAddToCart,
  isLoading,
}) {
  
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavourite={(obj) => onAddToFavourite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        favourited={item && favourites.some((obj) => Number(obj.id) === Number(item.id))}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content">
      <div className="searchWrapper">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="searchBlock">
          <img src="img/search.svg" alt="Search" />
          {searchValue && (
            <img onClick={onSearchClear} className="clear" src="img/btn-remove.svg" alt="Clear" />
          )}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>
      <div className="sneakers">{renderItems()}</div>
    </div>
  );
}

export default Home;

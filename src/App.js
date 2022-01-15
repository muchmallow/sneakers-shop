import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Drawer from './components/Drawer';
import Header from './components/Header';
import AppContext from './context';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const itemsResponse = await axios.get('https://619973db9022ea0017a7ae6d.mockapi.io/items');
        const cartResponse = await axios.get('https://619973db9022ea0017a7ae6d.mockapi.io/cart');
        const favouritesResponse = await axios.get(
          'https://619973db9022ea0017a7ae6d.mockapi.io/favourites',
        );

        setCartItems(cartResponse.data);
        setFavourites(favouritesResponse.data);
        setItems(itemsResponse.data);
        setIsLoading(false);
      } catch (error) {
        alert('Не удалось получить начальные данные с сервера.');
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://619973db9022ea0017a7ae6d.mockapi.io/cart/${findItem}`);
      } else {
        setCartItems((prev) => [...prev, data]);
        const { data } = await axios.post('https://619973db9022ea0017a7ae6d.mockapi.io/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении(удалении) товара в корзину.');
    }
  };

  const onRemoveItem = (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(id)));
      axios.delete(`https://619973db9022ea0017a7ae6d.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('Ошибка при запросе на удаление.');
    }
  };

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find((fav) => Number(fav.id) === Number(obj.id))) {
        setFavourites((prev) => prev.filter((fav) => Number(fav.id) !== Number(obj.id)));
        axios.delete(`https://619973db9022ea0017a7ae6d.mockapi.io/favourites/${obj.id}`);
      } else {
        const { data } = await axios.post(
          'https://619973db9022ea0017a7ae6d.mockapi.io/favourites',
          obj,
        );
        setFavourites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Ошибка при добавлении в закладки.');
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onSearchClear = () => setSearchValue('');

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favourites,
        onAddToFavourite,
        onAddToCart,
        isItemAdded,
        setCartOpened,
        setCartItems,
      }}>
      <div className="wrapper">
        {/* {cartOpened && <Drawer onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />} */}
        <Drawer onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route exact path="/favourites" element={<Favourites />} />
          <Route
            exact
            path="/"
            element={
              <Home
                items={items}
                favourites={favourites}
                searchValue={searchValue}
                onSearchClear={onSearchClear}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavourite={onAddToFavourite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route exact path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

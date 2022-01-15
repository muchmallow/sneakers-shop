import React from 'react';
import axios from 'axios';

import Info from '../Info';
import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClose, onRemove, opened }) => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComlete, setisOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`https://619973db9022ea0017a7ae6d.mockapi.io/orders`, {
        items: cartItems,
      });
      //  await axios.put('https://619973db9022ea0017a7ae6d.mockapi.io/cart', []);
      setOrderId(data.id);
      setisOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://619973db9022ea0017a7ae6d.mockapi.io/cart/${item.id}`);
        await delay(700);
      }
    } catch (error) {
      alert('Возникла ошибка при оформлении заказа :(');
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2>
          Корзина
          <img
            onClick={onClose}
            className={styles.removeBtn}
            src="img/btn-remove.svg"
            alt="Close"
          />
        </h2>
        {cartItems.length > 0 ? (
          <div className={styles.itemsWrapper}>
            <div className={styles.items}>
              {cartItems.map((obj) => (
                <div key={obj.id} className={styles.cartItem}>
                  <img
                    className={styles.itemImg}
                    width={70}
                    height={70}
                    src={obj.imageUrl}
                    alt="Sneakers"
                  />
                  <div>
                    <p>{obj.title}</p>
                    <b>{obj.price} грн</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className={styles.removeBtn}
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} грн</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{totalPrice * 0.05} грн</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className={styles.greenButton}>
                Оформить заказ
                <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComlete ? 'Заказ оформлен!' : 'Корзина пустая.'}
            image={isOrderComlete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
            description={
              isOrderComlete
                ? `Ваш заказ ${orderId} оформлен, ожидайте звонка менеджера.`
                : 'Добавьте товар чтобы сделать заказ.'
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;

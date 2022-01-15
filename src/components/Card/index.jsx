import React from 'react';
import ContentLoader from 'react-content-loader';

import AppContext from '../../context';

import styles from './Card.module.scss';

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavourite,
  onPlus,
  favourited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavourite, setIsFavourite] = React.useState(favourited);

  const onClickPlus = () => {
    onPlus({ id, parentId: id, title, price, imageUrl });
  };

  const onClickFavourite = () => {
    onFavourite({ id, title, price, imageUrl });
    setIsFavourite(!isFavourite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={220}
          height={265}
          viewBox="0 0 220 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="0" y="0" rx="10" ry="10" width="220" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="220" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="184" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavourite && (
            <div className={styles.favourite} onClick={onClickFavourite}>
              <img src={isFavourite ? 'img/liked.svg' : 'img/unliked.svg'} alt="Bookmark" />
            </div>
          )}
          <div className={styles.imgWrapper}>
            <img width={'90%'} height={150} src={imageUrl} alt="Sneakers" />
          </div>
          <h5>{title}</h5>
          <div className={styles.cardBottom}>
            <div className={styles.cardBottomLeft}>
              <span>Цена:</span>
              <b>{price} грн</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;

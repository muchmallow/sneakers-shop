import axios from 'axios';
import React from 'react';

import Card from '../components/Card';

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(true);

  React.useEffect(() => {
    try {
      const getOrders = async () => {
        const { data } = await axios.get('https://619973db9022ea0017a7ae6d.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsloading(false);
      };
      getOrders();
    } catch (error) {
      alert('Не удалось получить список заказов.');
    }
  }, []);

  return (
    <div className="content">
      <div className="searchWrapper">
        <h1>Мои заказы</h1>
      </div>
      <div className="sneakers">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;

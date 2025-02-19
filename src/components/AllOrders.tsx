import React from 'react';
import OrderItem from './OrderItem';
import { OrderItemInt } from '../types/typeIndex';

interface AllOrdersProps {
  orders: OrderItemInt[];
  openCart:(value: boolean)=>void;
}

const AllOrders: React.FC<AllOrdersProps> = ({ openCart, orders }) => {
  return (
    <>
      {orders.length ? (
        orders.map((item) => (
          <OrderItem openCart={openCart} key={item.id} orderItem={item} />  
        ))
      ) : (
        <p>No orders available</p>
      )}
    </>
  );
};

export default AllOrders;

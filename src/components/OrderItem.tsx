import React, { useEffect, useState } from 'react';
import { OrderItemInt } from '../types/typeIndex';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

import { addToCart } from '../features/cartSlice';
import { selectCartItems} from '../features/cartSlice';

interface OrderItemProps {
  orderItem: OrderItemInt;
  openCart:(value: boolean)=>void;
}



const OrderItem: React.FC<OrderItemProps> = ({openCart, orderItem }) => {
  const [inCart, setInCart] = useState<boolean>(false)

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(orderItem));
  };

  const products = useAppSelector(selectCartItems);

  function findProductById(id: number) {
    const productExists = products.some(product => product.id === id);
    setInCart(productExists);
}


  useEffect(()=>{
    findProductById(orderItem.id)
  }, [products])

  const handleOpenCart = () =>{
    openCart(true)
  }

  return (
    <div className="orderItemWrap">

      <img 
        src={orderItem.image || 'https://via.placeholder.com/150'} 
        alt={orderItem.title || "Order Image"} 
        className="orderItemImg" 
      />

<h1 className="orderTitle">
  {orderItem.title.length > 15 ? orderItem.title.slice(0, 15) + "..." : orderItem.title}
</h1>


      <p className="orderPrice">
        ${orderItem.price}
      </p>

      

      <p className="orderCategory">
        Category: {orderItem.category}
      </p>


      {orderItem.rating ? (
        <p className="orderRating">
          ⭐ {orderItem.rating?.rate} ({orderItem.rating?.count} reviews)
        </p>
      ) : (
        <p className="orderRating">No rating available</p>
      )}

{inCart?<button onClick={handleOpenCart} className='openCartBtn'>Go to cart</button>:<button onClick={handleAddToCart} className='addCartBtn'>Add to cart</button>}

    </div>
  );
};

export default OrderItem;

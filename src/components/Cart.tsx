
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { selectCartItems, selectTotalPrice, removeFromCart, updateQuantity, clearCart } from '../features/cartSlice';

interface CartProps {
    setCloseCart:(value: boolean)=>void;
}

const Cart:React.FC<CartProps> = ({setCloseCart}) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCloseCart = () => {
    setCloseCart(false)
  }

  return (
    <div className="cart">
        <div className="cartHeader">
        <h2>Your Cart</h2>

        <button onClick={handleCloseCart} className='closeButtonCart'>x</button>
        </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className='cartList'>
            {cartItems.map(item => (
              <li className='cartItem' key={item.id}>
                {item.title} - ${item.price} x {item.quantity}

                <div className='cartItemAction'>

              
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                />
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <p className='cartPriceText'>Total Price: ${totalPrice.toFixed(2)}</p>

          <div className="cartButtons">
          <button className='handleClearCart' onClick={handleClearCart}>Clear Cart</button>
          <button className='handleProceedCart' >Proceed to Checkout</button>
          </div>
  
        </>
      )}
    </div>
  );
};

export default Cart;

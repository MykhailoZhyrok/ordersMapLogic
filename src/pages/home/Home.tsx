import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchOrders, selectFilteredOrders } from '../../features/orderSlice';
import { selectTotalPrice } from '../../features/cartSlice';
import AllOrders from '../../components/AllOrders';
import Filter from '../../components/Filter';
import './Home.scss';
import Cart from '../../components/Cart';



const Home = () => {

  const [openCart, setOpenCart] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectFilteredOrders);
  const totalPrice = useAppSelector(selectTotalPrice);
  const loading = useAppSelector((state) => state.orders.loading);
  const error = useAppSelector((state) => state.orders.error);

  useEffect(() => {
    dispatch(fetchOrders());
    if (error) {
      alert(error)
    }
  }, [dispatch]);


  const handleCart = () =>{
    setOpenCart(!openCart)
  }

  return (
    <div className='homeWrap'>
      
   

      <div className='homeHeader'>
      <h1>Orders</h1>

      <button className='cartButton' onClick={handleCart}>{totalPrice?`Cart:${totalPrice.toFixed(2)}$`:"Cart"}</button>
      </div>
      <Filter />
      {openCart?<Cart setCloseCart={setOpenCart}/>:<></>}
      {openCart?<div className='cartBack'>

      </div>:<></>}
      <div className="haeder">

        {loading ? <div className="loader"></div> : <AllOrders openCart={setOpenCart} orders={orders} />}

      </div>

  
    </div>
  )

}

export default Home
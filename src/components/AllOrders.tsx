import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import { OrderItemInt } from '../types/typeIndex';
import { selectCategories } from '../features/orderSlice';
import { useAppSelector } from '../hooks/hooks';

interface AllOrdersProps {
  orders: OrderItemInt[];
  openCart: (value: boolean) => void;
}

const ITEMS_PER_PAGE = 6; 

const AllOrders: React.FC<AllOrdersProps> = ({ openCart, orders }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const filterItem = useAppSelector(selectCategories);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  useEffect(()=>{
    setCurrentPage(1)
  }, [filterItem, orders.length])
  return (
    <>
    <div className='allOrdersWrap'>

      {paginatedOrders.length ? (
        paginatedOrders.map((item) => (
          <OrderItem openCart={openCart} key={item.id} orderItem={item} />
        ))
      ) : (
        <p>No orders available</p>
      )}


     
    </div>
    {totalPages > 1 && (
  <div className="pagination">
    <button
      disabled={currentPage === 1}
      onClick={() => {
        setCurrentPage((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: 'instant'});
      }}
    >
      Prev
    </button>

    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        className={`paginationButton ${currentPage === i + 1 ? 'active' : ''}`}
        onClick={() => {
          setCurrentPage(i + 1);
          window.scrollTo({ top: 0, behavior: 'instant'});
        }}
      >
        {i + 1}
      </button>
    ))}

    <button
      disabled={currentPage === totalPages}
      onClick={() => {
        setCurrentPage((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }}
    >
      Next
    </button>
  </div>
)}

    </>
  );
};

export default AllOrders;

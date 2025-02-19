import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setCategoryFilter, selectCategories } from '../features/orderSlice';

const Filter = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const selectedCategory = useAppSelector((state) => state.orders.filterCriteria.category);

  const handleCategoryChange = (category: string) => {
    dispatch(setCategoryFilter(category === 'All' ? undefined : category));
  };

  return (
    <div className='filterWrap'>
      <h2>Filter by Category</h2>
      <select value={selectedCategory || 'All'} onChange={(e) => handleCategoryChange(e.target.value)}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;

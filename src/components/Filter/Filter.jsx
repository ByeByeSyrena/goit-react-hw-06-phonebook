import css from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { initialFilter } from 'redux/selectors';

const Filter = ({ id }) => {
  const dispatch = useDispatch();
  const filter = useSelector(initialFilter);

  const handleFilterChange = event => {
    const newFilter = event.target.value;
    dispatch(setFilter(newFilter));
  };

  return (
    <div className={css.filterWrapper}>
      <h2>Contacts</h2>
      <h3 className={css.filterHeadline}>Find contacts by name</h3>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;

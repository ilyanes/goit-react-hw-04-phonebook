import PropTypes from 'prop-types';

export const Filter = props => {
  const inputHandler = e => {
    const { value } = e.currentTarget;
    props.onFilter(value);
  };
  return (
    <label htmlFor="">
      Find my contacts by name
      <input type="text" name="filter" onChange={inputHandler} />
    </label>
  );
};
Filter.propTypes = {
  value: PropTypes.string,
};

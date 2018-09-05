// FoodList.js
import React from 'react';
import PropTypes from 'prop-types';
import Food from './Food';

const FoodList = (props) => {
  const foodNodes = props.data.map(food => (
    <Food author={food.author} key={food._id} id={food._id}>
      { food.text}
    </Food>
  ));
  return (
    <div>
      { foodNodes }
    </div>
  );
};

FoodList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
  })),
};

FoodList.defaultProps = {
  data: [],
};

export default FoodList;
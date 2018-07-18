import React from 'react';

const MenuItem = ({ itemValue, className, onSomeEvent }) => {
  let isActive = false;
  return (
    <a onClick= {onSomeEvent} className={className}>{itemValue}</a>
  )
}
export default MenuItem;

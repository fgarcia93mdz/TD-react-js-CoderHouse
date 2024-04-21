import React from 'react';

const ItemListContainer = ({ text, author }) => {
  
  return (
    <div>
      <h2 style={{ color: 'black', textAlign: 'center', fontSize: '2em' }}>{text}</h2>
      <h3 style={{ color: 'black', textAlign: 'center', fontSize: '1.5em' }}>{author}</h3>
    </div>
  );
};

export default ItemListContainer;
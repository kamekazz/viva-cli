import React from 'react';
import Header from './Header';
import FlashMessagesList  from './FlashMessagesList';

export default ({ children }) => {
  return (
    <div>
        <FlashMessagesList />
        <Header></Header>
        {children}
    </div>
  );
};
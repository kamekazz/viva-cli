import React from 'react';
import Header from './Header';
import FlashMessagesList  from './FlashMessagesList';
import DraggableDialog from './layout/DraggableDialog';


export default ({ children }) => {
  return (
    <div>
        <DraggableDialog />
        <FlashMessagesList />
        <Header></Header>
        {children}
    </div>
  );
};
import React from 'react';
import ProductList from './components/ProductList/ProductList';
import EventBanner from './components/EventBanner/EventBanner';
import { Route, Routes } from "react-router-dom";
import ProductPage from './components/ProductPage/ProductPage';
import Cart from './components/Cart/Cart';
import useEventBannerVisibility from './hooks/useEventBannerVisibility';

const AppContent = ({ slides, handleCategoryClick }) => {
  const [showEventBanner, setShowEventBanner] = useEventBannerVisibility();

  return (
    <>
      {showEventBanner && <EventBanner slides={slides} onCategoryClick={handleCategoryClick}/>}
      <Routes>
          <Route path='/' element={<ProductList selectedCategory={null} />} />
          <Route path='/category/:category' element={<ProductList />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/cart' element={<Cart />} /> 
      </Routes>
    </>
  );
};

export default AppContent;
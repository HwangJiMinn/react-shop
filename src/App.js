import React, { useEffect, useState} from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './components/theme';
import { GlobalStyles } from './components/GlobalStyles';
import Navbar from './components/Nav/Nav';
import { BrowserRouter } from "react-router-dom";
import Footer from './components/Footer/Footer';
import AppRouter from './AppRouter';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const slides = [
    {
      imageUrl: './옷.jpg',
      title: '물빠진 청바지!',
      description: '이제 막 도착한 패션 청바지를 구경해 보세요',
      category: 'fashion'
    },
    {
      imageUrl: './악세서리.jpg',
      title: '아름다운 코디!',
      description: '장인의 손길을 거친 악세사리를 만나보세요.',
      category: 'jewelery'
    },
    {
      imageUrl: './디지털.jpg',
      title: '신속한 업무처리!',
      description: '다양한 디지털 상품을 둘러보세요.',
      category: 'electronics'
    },
  ];

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };



  const handleLogoClick = () => {
    setSelectedCategory(null);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
          <Navbar theme={theme} toggleTheme={toggleTheme} onCategoryClick={handleCategoryClick} onLogoClick={handleLogoClick} />
          <AppRouter slides={slides} handleCategoryClick={handleCategoryClick} />
          <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

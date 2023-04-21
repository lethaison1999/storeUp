import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
//page
import { Home, Cart, CategoryProduct, ProductSingle, Search, ScrollUp } from './pages/index';
//components
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import store from './store/store';
import { Provider } from 'react-redux';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductSingle />} />
            <Route path="/category/:category" element={<CategoryProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search/:searchTerm" element={<Search />} />
          </Routes>
          <Footer />
          <ScrollUp />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

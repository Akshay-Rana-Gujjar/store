import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Category from './page/Category';
import CartPage from './page/Cart';
import BackButton from './component/BackButton';
import HideElement from './component/HideElement';
import Header from './component/Header';
import Firebase from './provider/firebase';
import Cart from './component/CartButton';
import CartProvider from './provider/Cart';

function App() {
  return (
    <CartProvider>
      <Firebase>
        <div className="app-body">
          <Router>
            <HideElement hideOnPaths={['/']}>
              <BackButton />
            </HideElement>
            <HideElement hideOnPaths={['/cart']}>
              <Cart />
              <Header />
            </HideElement>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:id" element={<Category />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Router>
        </div>
      </Firebase>
    </CartProvider>
  );
}

export default App;

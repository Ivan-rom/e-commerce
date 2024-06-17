import '../src/styles/index.sass';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Profile from './views/Profile/Profile';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import NotFoundPage from './pages/notFound/NotFound';
import Main from './views/MainPage';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import About from './views/About';
import { Auth } from './scripts/constants/apInterfaces';
import ProductPage from './views/ProductPage';
import ReactModal from 'react-modal';
import BasketPage from './views/BasketPage';
import { useEffect } from 'react';
import { getCartAction } from './store/actions/cartActions';
import { useAppDispatch } from './scripts/hooks/storeHooks';

ReactModal.setAppElement('#root');
function App() {
  const dispatch = useAppDispatch();
  const state = useSelector((state: Auth) => state);

  useEffect(() => {
    if (state.auth) {
      dispatch(getCartAction('28546874-9a61-41a6-a2d3-022704efa0e0'));
    }
  }, [state.auth, dispatch]);

  return (
    <Router>
      <Header />
      <main className="container mx-auto md:min-w-80">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/home" element={<Main />}></Route>
          <Route path="/main" element={<Main />}></Route>
          {/* <Route path="/" element={<About />}></Route> */}
          {!state.auth.isLoggedIn ? (
            <Route path="/login" element={<LoginPage />}></Route>
          ) : (
            <Route path="/login" element={<Navigate replace to="/" />}></Route>
          )}
          {!state.auth.isLoggedIn ? (
            <Route path="/register" element={<RegisterPage />}></Route>
          ) : (
            <Route path="/register" element={<Navigate replace to="/" />}></Route>
          )}
          {state.auth.isLoggedIn ? (
            <Route path="/profile" element={<Profile />}></Route>
          ) : (
            <Route path="/profile" element={<Navigate replace to="/" />}></Route>
          )}
          <Route path="/basket" element={<BasketPage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;

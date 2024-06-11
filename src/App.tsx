import '../src/styles/index.sass';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Profile from './views/Profile/Profile';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import NotFoundPage from './pages/notFound/NotFound';
import Main from './views/MainPage';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import { Auth } from './scripts/constants/apInterfaces';
import ProductPage from './views/ProductPage';
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');
function App() {
  const state = useSelector((state: Auth) => state.auth);
  return (
    <Router>
      <Header />
      <main className="container md mx-auto min-w-80">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/home" element={<Main />}></Route>
          <Route path="/main" element={<Main />}></Route>
          {/* <Route path="/" element={<About />}></Route> */}
          {!state.isLoggedIn ? (
            <Route path="/login" element={<LoginPage />}></Route>
          ) : (
            <Route path="/login" element={<Navigate replace to="/" />}></Route>
          )}
          {!state.isLoggedIn ? (
            <Route path="/register" element={<RegisterPage />}></Route>
          ) : (
            <Route path="/register" element={<Navigate replace to="/" />}></Route>
          )}
          {state.isLoggedIn ? (
            <Route path="/profile" element={<Profile />}></Route>
          ) : (
            <Route path="/profile" element={<Navigate replace to="/" />}></Route>
          )}
          <Route path="product/:id" element={<ProductPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;

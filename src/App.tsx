import '../src/styles/index.sass';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import NotFoundPage from './pages/notFound/NotFound';
import Main from './views/MainPage';
import { useSelector } from 'react-redux';
import Header from './components/Header';
// import { useDispatch, useSelector } from 'react-redux';
interface auth {
  auth: props;
}

interface props {
  isLoggedIn: boolean;
  user: object;
}
function App() {
  const state = useSelector((state: auth) => state.auth);
  return (
    <Router>
      <Header />
      <main
        className="container min-w-full md mx-auto min-w-80
"
      >
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
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;

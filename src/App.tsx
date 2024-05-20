import '../src/styles/index.sass';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './pages/about/About';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import NotFoundPage from './pages/notFound/NotFound';
import Header from './components/Header';
import { useSelector } from 'react-redux';

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
          <Route path="/" element={<About />}></Route>
          {!state.isLoggedIn && <Route path="/login" element={<LoginPage />}></Route>}
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;

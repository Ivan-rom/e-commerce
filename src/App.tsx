import '../src/styles/index.sass';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './pages/about/About';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import NotFoundPage from './pages/notFound/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

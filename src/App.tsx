import '../src/styles/index.sass';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './pages/about/About';
import NotFoundPage from './pages/notFound/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

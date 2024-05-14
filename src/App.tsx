import '../src/styles/index.sass';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './pages/about/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

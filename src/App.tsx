import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './Header';
import LivroDados from './LivroDados';
import LivroLista from './LivroLista';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<LivroLista />} />
          <Route path="/dados" element={<LivroDados />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

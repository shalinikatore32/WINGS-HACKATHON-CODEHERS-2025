import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventSignup from './singin-signup-pages/EventSignup';
import EventSignin from './singin-signup-pages/EventSignin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<EventSignup />} />
        <Route path="/signin" element={<EventSignin />} />
        </Routes>
      </Router>
  );
}

export default App;

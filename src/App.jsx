// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import DecodedPage from './pages/DecodedPage';
import ArchivesPage from './pages/ArchivesPage';
import SinglePostPage from './pages/SinglePostPage'; // අලුතෙන් import කරගන්නවා

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/decoded" element={<DecodedPage />} />
      <Route path="/decoded/:slug" element={<SinglePostPage />} /> {/* අලුත් dynamic route එක */}

      <Route path="/the-archives" element={<ArchivesPage />} />
      <Route path="/the-archives/:slug" element={<SinglePostPage />} /> {/* අලුත් dynamic route එක */}
    </Routes>
  );
}

export default App;
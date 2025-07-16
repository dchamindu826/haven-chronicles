// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import DecodedPage from './pages/DecodedPage';
import ArchivesPage from './pages/ArchivesPage';
import SinglePostPage from './pages/SinglePostPage'; // අලුතෙන් import කරගන්නවා
import EpisodeListPage from './pages/EpisodeListPage';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/decoded" element={<DecodedPage />} />
      <Route path="/decoded/:slug" element={<SinglePostPage />} />
      <LanguageSwitcher />
      <Route path="/the-archives" element={<ArchivesPage />} />
      {/* --- අලුතෙන් එකතු කරපු Route එක --- */}
      <Route path="/the-archives/season/:seasonNumber" element={<EpisodeListPage />} />
      <Route path="/the-archives/episode/:slug" element={<SinglePostPage />} />
      
    </Routes>
  );
}

export default App;
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import LanguageSwitcher from './components/LanguageSwitcher';
import Footer from './components/Footer'; // <-- 1. Footer එක import කරගන්න

// --- ඔයාගේ page components ටික import කරගන්න ---
import Homepage from './pages/Homepage';
import ArchivesPage from './pages/ArchivesPage';
import EpisodeListPage from './pages/EpisodeListPage';
import DecodedPage from './pages/DecodedPage';
import SinglePostPage from './pages/SinglePostPage';


function App() {
  return (
    <>
      <LanguageSwitcher />

      {/* 2. ප්‍රධාන content එකට <main> wrapper එකක් දාමු */}
      <main className="main-content">
        <Routes>
          {/* මෙතන තියෙන්න ඕනේ <Route> components විතරයි */}
          <Route path="/" element={<Homepage />} />

          <Route path="/the-archives" element={<ArchivesPage />} />
          <Route path="/the-archives/season/:seasonNumber" element={<EpisodeListPage />} />
          <Route path="/the-archives/episode/:slug" element={<SinglePostPage />} />
          
          <Route path="/decoded" element={<DecodedPage />} />
          <Route path="/decoded/:slug" element={<SinglePostPage />} />
        </Routes>
      </main>

      {/* 3. Footer එක මෙතනට, main content එකට පස්සේ දාන්න */}
      <Footer />
    </>
  );
}

export default App;
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import LanguageSwitcher from './components/LanguageSwitcher';

// --- ඔයාගේ page components ටික import කරගන්න ---
import Homepage from './pages/Homepage';
import ArchivesPage from './pages/ArchivesPage';
import EpisodeListPage from './pages/EpisodeListPage';
import DecodedPage from './pages/DecodedPage';
import SinglePostPage from './pages/SinglePostPage';


function App() {
  return (
    // <LanguageSwitcher> එක <Routes> එකට පිටින්, හැබැයි ප්‍රධාන Fragment <> එක ඇතුලේ තියෙන්න ඕන.
    <>
      <LanguageSwitcher />

      <Routes>
        {/* මෙතන තියෙන්න ඕනේ <Route> components විතරයි */}
        <Route path="/" element={<Homepage />} />

        <Route path="/the-archives" element={<ArchivesPage />} />
        <Route path="/the-archives/season/:seasonNumber" element={<EpisodeListPage />} />
        <Route path="/the-archives/episode/:slug" element={<SinglePostPage />} />
        
        <Route path="/decoded" element={<DecodedPage />} />
        <Route path="/decoded/:slug" element={<SinglePostPage />} />
      </Routes>
    </>
  );
}

export default App;
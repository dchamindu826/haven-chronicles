import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext'; // අපේ Provider එක import කරනවා

// Pages
import Homepage from './pages/Homepage';
import ArchivesPage from './pages/ArchivesPage';
import EpisodeListPage from './pages/EpisodeListPage';
import DecodedPage from './pages/DecodedPage';
import SinglePostPage from './pages/SinglePostPage';

// Layout
import MainLayout from './components/MainLayout'; // අපේ Layout එක import කරනවා

function App() {
  return (
    // Provider එකෙන් මුළු App එකම wrap කරනවා
    <LanguageProvider>
      <Routes>
        {/* Homepage එකට වෙනම Route එකක්. ඒක MainLayout එක ඇතුළේ නැති නිසා Switcher එක පේන්නේ නෑ */}
        <Route path="/" element={<Homepage />} />

        {/* Layout එක පාවිච්චි කරන අනිත් Routes මෙතන */}
        <Route element={<MainLayout />}>
          <Route path="/the-archives" element={<ArchivesPage />} />
          <Route path="/the-archives/season/:seasonNumber" element={<EpisodeListPage />} />
          <Route path="/the-archives/episode/:slug" element={<SinglePostPage />} />
          
          <Route path="/decoded" element={<DecodedPage />} />
          <Route path="/decoded/:slug" element={<SinglePostPage />} />
        </Route>
      </Routes>
    </LanguageProvider>
  );
}

export default App;
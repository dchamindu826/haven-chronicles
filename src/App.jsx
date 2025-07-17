import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

// Components
import Header from './components/Header'; // <-- Header එක import කරනවා
import Footer from './components/Footer'; // <-- Footer එක import කරනවා
import MainLayout from './components/MainLayout';

// Pages
import Homepage from './pages/Homepage';
import ArchivesPage from './pages/ArchivesPage';
import EpisodeListPage from './pages/EpisodeListPage';
import DecodedPage from './pages/DecodedPage';
import SinglePostPage from './pages/SinglePostPage';

function App() {
  return (
    <LanguageProvider>
      <div className="app-container">
        <Header /> {/* <-- Header එක මෙතන දානවා */}
        <div className="content-wrap">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route element={<MainLayout />}>
                <Route path="/the-archives" element={<ArchivesPage />} />
                <Route path="/the-archives/season/:seasonNumber" element={<EpisodeListPage />} />
                <Route path="/the-archives/episode/:slug" element={<SinglePostPage />} />
                <Route path="/decoded" element={<DecodedPage />} />
                <Route path="/decoded/:slug" element={<SinglePostPage />} />
              </Route>
            </Routes>
        </div>
        <Footer /> {/* <-- Footer එක මෙතන දානවා */}
      </div>
    </LanguageProvider>
  );
}

export default App;
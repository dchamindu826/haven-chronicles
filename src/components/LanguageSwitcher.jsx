import React from 'react';
import { useLanguage } from '../context/LanguageContext'; // අපේ custom hook එක import කරනවා

function LanguageSwitcher() {
  // context එකෙන් language එකයි, toggle function එකයි ගන්නවා
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      {/* button එක click කරාම කෙලින්ම toggleLanguage function එක call කරනවා */}
      <button onClick={toggleLanguage}>
        {language === 'si' ? 'English' : 'සිංහල'}
      </button>
    </div>
  );
}

export default LanguageSwitcher;
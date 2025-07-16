// src/components/LanguageSwitcher.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './LanguageSwitcher.css'; // අපි මේකට styles ටිකක් දාමු

function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button onClick={toggleLanguage} className="language-switcher">
            {language === 'en' ? 'සිංහල' : 'English'}
        </button>
    );
}

export default LanguageSwitcher;
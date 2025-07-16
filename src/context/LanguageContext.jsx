// src/context/LanguageContext.jsx
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default language is English

    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === 'en' ? 'si' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
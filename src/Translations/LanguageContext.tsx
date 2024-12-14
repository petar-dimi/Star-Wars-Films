import React, { createContext, useState, useContext, ReactNode } from 'react';

type LanguageContextType = {
  language: 'en' | 'de';
  switchLanguage: () => void;
  isEnglishDisabled: boolean;  
  isGermanDisabled: boolean;  
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'de'>('en');
  const [isEnglishDisabled, setIsEnglishDisabled] = useState(true); 
  const [isGermanDisabled, setIsGermanDisabled] = useState(false);  

  const switchLanguage = () => {
    if (language === 'en') {
      setLanguage('de');
      setIsEnglishDisabled(false); 
      setIsGermanDisabled(true);   
    } else {
      setLanguage('en');
      setIsEnglishDisabled(true); 
      setIsGermanDisabled(false); 
    }
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, isEnglishDisabled, isGermanDisabled }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

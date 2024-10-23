import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const localTheme = localStorage.getItem('color-theme');
    if (localTheme) {
      setTheme(localTheme);
      document.documentElement.classList.toggle('dark', localTheme === 'dark');
    } else {
      
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('color-theme', newTheme);
  };

  const passedContext = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={passedContext}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };

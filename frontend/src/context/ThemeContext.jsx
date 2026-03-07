// // import { createContext, useContext, useEffect, useState } from 'react';

// // const ThemeContext = createContext();

// // export const ThemeProvider = ({ children }) => {
// //   const [isDark, setIsDark] = useState(
// //     () => localStorage.getItem('theme') !== 'light'
// //   );

// //   useEffect(() => {
// //     document.documentElement.classList.toggle('dark', isDark);
// //     localStorage.setItem('theme', isDark ? 'dark' : 'light');
// //   }, [isDark]);

// //   return (
// //     <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(p => !p) }}>
// //       {children}
// //     </ThemeContext.Provider>
// //   );
// // };

// // export const useTheme = () => useContext(ThemeContext);

// import { createContext, useContext, useEffect, useState } from 'react';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [isDark, setIsDark] = useState(() => {
//     const saved = localStorage.getItem('theme');
//     // Default to dark if nothing saved
//     return saved ? saved === 'dark' : true;
//   });

//   useEffect(() => {
//     const root = document.documentElement;
//     if (isDark) {
//       root.classList.add('dark');
//       root.classList.remove('light');
//     } else {
//       root.classList.remove('dark');
//       root.classList.add('light');
//     }
//     localStorage.setItem('theme', isDark ? 'dark' : 'light');
//   }, [isDark]);

//   const toggle = () => setIsDark(prev => !prev);

//   return (
//     <ThemeContext.Provider value={{ isDark, toggle }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);




import { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ isDark: true }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
// // import { createContext, useContext, useState, useEffect } from 'react';
// // import api, { setToken } from '../services/api';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user,    setUser]    = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Only try ONCE — if it fails, just set loading false
// //     const tryRefresh = async () => {
// //       try {
// //         const res = await api.post('/auth/refresh');
// //         setToken(res.data.data.accessToken);
// //         const me = await api.get('/auth/me');
// //         setUser(me.data.data);
// //       } catch {
// //         // Not logged in — that's fine, stop here
// //         setUser(null);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     tryRefresh();
// //   }, []); // ← empty array = runs ONCE only

// //   const login = async (email, password) => {
// //     const res = await api.post('/auth/login', { email, password });
// //     setToken(res.data.data.accessToken);
// //     setUser(res.data.data.user);
// //     return res.data.data.user;
// //   };

// //   const logout = async () => {
// //     try { await api.post('/auth/logout'); } catch {}
// //     setToken(null);
// //     setUser(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, loading, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);





// import { createContext, useContext, useState, useEffect } from 'react';
// import api, { setToken } from '../services/api';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user,    setUser]    = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const tryRefresh = async () => {
//       try {
//         const res = await api.post('/auth/refresh');
//         const { accessToken } = res.data.data;
//         setToken(accessToken);
//         const me = await api.get('/auth/me');
//         setUser(me.data.data);
//       } catch {
//         setToken(null);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     tryRefresh();
//   }, []);

//   const login = async (email, password) => {
//     const res = await api.post('/auth/login', { email, password });
//     const { accessToken, user } = res.data.data;
//     setToken(accessToken);
//     setUser(user);
//     return user;
//   };

//   const logout = async () => {
//     try { await api.post('/auth/logout'); } catch {}
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



import { createContext, useContext, useState, useEffect } from 'react';
import api, { setToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await api.post('/auth/refresh');
        const { accessToken } = res.data.data;
        setToken(accessToken);
        const me = await api.get('/auth/me');
        setUser(me.data.data);
      } catch {
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    tryRefresh();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { accessToken, user } = res.data.data;
    setToken(accessToken);
    setUser(user);
    return user;
  };

  const logout = async () => {
    try { await api.post('/auth/logout'); } catch {}
    setToken(null);
    setUser(null);
  };

  // ✅ Call this anywhere to re-fetch latest user data from server
  const refreshUser = async () => {
    try {
      const me = await api.get('/auth/me');
      setUser(me.data.data);
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
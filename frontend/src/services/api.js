// // import axios from 'axios';

// // const api = axios.create({
// //   baseURL:         import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
// //   withCredentials: true,
// // });

// // let accessToken = null;

// // export const setToken = (token) => {
// //   accessToken = token;
// // };

// // api.interceptors.request.use((config) => {
// //   if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
// //   return config;
// // });

// // api.interceptors.response.use(
// //   (res) => res,
// //   async (err) => {
// //     if (err.response?.status === 401 && !err.config._retry) {
// //       err.config._retry = true;
// //       try {
// //         const res = await api.post('/auth/refresh');
// //         setToken(res.data.data.accessToken);
// //         err.config.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
// //         return api(err.config);
// //       } catch {
// //         window.location.href = '/login';
// //       }
// //     }
// //     return Promise.reject(err);
// //   }
// // );

// // export default api;


// import axios from 'axios';

// const api = axios.create({
//   baseURL:         import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
//   withCredentials: true,
// });

// let accessToken = null;

// export const setToken = (token) => {
//   accessToken = token;
// };

// api.interceptors.request.use((config) => {
//   if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
//   return config;
// });

// // NO auto-retry interceptor — it caused the infinite loop
// api.interceptors.response.use(
//   (res) => res,
//   (err) => Promise.reject(err)
// );

// export default api;

// import axios from 'axios';

// const api = axios.create({
//   baseURL:         'http://localhost:5000/api/v1',
//   withCredentials: true,
// });

// let authToken = null;

// export const setToken = (token) => {
//   authToken = token;
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//   }
// };

// api.interceptors.request.use((config) => {
//   if (authToken) {
//     config.headers['Authorization'] = `Bearer ${authToken}`;
//   }
//   return config;
// });

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1",
  withCredentials: true,
});

let authToken = null;

export const setToken = (token) => {
  authToken = token;
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }
  return config;
});

export default api;
// // import axios from "axios";

// // const api = axios.create({
// //   baseURL: import.meta.env.VITE_API_URL + "/api/v1",
// //   withCredentials: true,
// // });

// // let authToken = null;

// // export const setToken = (token) => {
// //   authToken = token;
// //   if (token) {
// //     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// //   } else {
// //     delete api.defaults.headers.common["Authorization"];
// //   }
// // };

// // api.interceptors.request.use((config) => {
// //   if (authToken) {
// //     config.headers["Authorization"] = `Bearer ${authToken}`;
// //   }
// //   return config;
// // });

// // export default api;



// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });

// let authToken = null;

// export const setToken = (token) => {
//   authToken = token;

//   if (token) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common["Authorization"];
//   }
// };

// api.interceptors.request.use((config) => {
//   if (authToken) {
//     config.headers["Authorization"] = `Bearer ${authToken}`;
//   }
//   return config;
// });

// export default api;



import axios from "axios";

const api = axios.create({
  baseURL: "https://a1classescentreofknowledge-api.onrender.com/api/v1",
  withCredentials: true,
});

export default api;
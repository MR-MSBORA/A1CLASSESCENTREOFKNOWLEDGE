// import "dotenv/config";
// import app from "./src/app.js";
// import cors from "cors";
// import connectDB from "./src/config/db.js";
// const PORT = process.env.PORT || 5000;
// connectDB().then(() => {
//   app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
// });

// app.use(
//   cors({
//     origin: "https://a1classescentreofknowledge-1.onrender.com",
//     credentials: true,
//   }),
// );


import "dotenv/config";
import app from "./src/app.js";
import cors from "cors";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

// Enable CORS first
app.use(
  cors({
    origin: "https://a1classescentreofknowledge-1.onrender.com",
    credentials: true,
  })
);

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
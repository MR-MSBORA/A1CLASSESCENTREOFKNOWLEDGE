import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import errorHandler from "./middleware/error.middleware.js";
import authRoutes from "./routes/v1/auth.routes.js";

import notesRoutes from "./routes/v1/notes.routes.js";
import paymentRoutes from "./routes/v1/payment.routes.js";
import doubtRoutes from "./routes/v1/doubt.routes.js";
import studentRoutes from "./routes/v1/student.routes.js";
import adminRoutes from "./routes/v1/admin.routes.js";


import galleryRoutes from './routes/v1/gallery.routes.js';
import reviewRoutes  from './routes/v1/review.routes.js';
import resultRoutes  from './routes/v1/result.routes.js';
import teacherRoutes from './routes/v1/teachers.routes.js';

const app = express();
app.use(helmet());


const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://a1classescentreofknowledge-1.onrender.com',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(mongoSanitize());
// Only rate limit in production
// In development — no limit
if (process.env.NODE_ENV === "production") {
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: {
        success: false,
        message: "Too many requests, please try again later",
      },
    }),
  );
}
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.get("/api/v1/health", (req, res) =>
  res.json({ success: true, message: "🚀 A1 API Running" }),
);

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/notes", notesRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/doubts", doubtRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/results', resultRoutes);
app.use('/api/v1/teachers', teacherRoutes);

app.use((req, res) =>
  res.status(404).json({ success: false, message: "Route not found" }),
);
app.use(errorHandler);
export default app;

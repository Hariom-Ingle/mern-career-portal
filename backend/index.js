import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import adminRoute from "./routes/admin.route.js";
import path from "path";

// Load environment variables
dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/admin", adminRoute);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  // Serve assets with correct MIME type for CSS, JS, etc.
  app.use("/assets", express.static(path.join(__dirname, "../frontend/dist/assets"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      } else if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      } else if (path.endsWith(".json")) {
        res.setHeader("Content-Type", "application/json");
      } else if (path.endsWith(".png")) {
        res.setHeader("Content-Type", "image/png");
      }
    }
  }));
  
  // Serve the frontend build
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Fallback for SPA
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  });
}

// Start Server and Connect to Database
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running at port ${PORT}`);
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1); // Exit process with failure
  }
});

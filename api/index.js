import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import notificationRoutes from './routes/notification.routes.js'
import connectionRoute from './routes/connections.route.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from "morgan";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({limit:"5mb"}));
app.use(cookieParser());
app.use(morgan('tiny'))

const allowedOrigins = ['https://linkedin-clone-2.onrender.com', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/connection', connectionRoute);

if (process.env.NODE_ENV === "production") {
  const clientPath = path.resolve(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientPath));


  app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongoose is connected!");
  })
  .catch((err) => {
    console.log(err);
  });
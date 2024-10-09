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


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(express.json({limit:"5mb"}));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true
}))
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});


app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/posts',postRoutes)
app.use('/api/v1/notifications',notificationRoutes)
app.use('/api/v1/connection',connectionRoute)

app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongoose  is connected!");
  })
  .catch((err) => {
    console.log(err);
  });

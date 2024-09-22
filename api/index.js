import express from "express";
import dotnev from "dotenv";
import mongoose from "mongoose";

import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import notificationRoutes from './routes/notification.routes.js'

import cookieParser from "cookie-parser";


dotnev.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/posts',postRoutes)
app.use('/api/v1/notifications',notificationRoutes)

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

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cookieParser());


const authRoutes = require('./routes/auth.routes');
const interviewRouter = require("./routes/interview.routes");

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

// here we write all the routes for our application. 
app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRouter);


module.exports = app;
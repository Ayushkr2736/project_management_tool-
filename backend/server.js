const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log("Dotenv loaded:");
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET);


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const errorHandler = require('./middleware/errorHandler');
const chatRoutes = require('./routes/chatRoutes');
const calendarRoutes = require('./routes/calendarRoutes');


const app = express();

connectDb();

const corsOptions = {
  origin: [
    'https://project-management-tool2734.netlify.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // if you need cookies/session support
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Project Management API");
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/connect', chatRoutes);
app.use('/api/calendar', calendarRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, (req,res) => {
  console.log(`Server running on port ${PORT}`);
});

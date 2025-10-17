import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

import UsersRoutes from './Routes/UsersRoutes.js';
import LandingRoutes from './Routes/LandingRoutes.js'
import AppointmentsRoutes from './Routes/AppointmentsRoutes.js';
import AdminRoutes from './Routes/AdminRoutes.js'
import initializeSocketIO from './util/socketHandler.js';
import attachIo from './Middlewares/attachIo.js';
import requestAuth from './Middlewares/requestAuth.js';

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

// app.use(cors()); // httpOnly cookie will not create like this
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

const httpServer = http.createServer(app);
const io = initializeSocketIO(httpServer);

// connect to routes with middlewares
app.use('/users', UsersRoutes);
app.use('/landing', LandingRoutes);
app.use('/appointments', requestAuth, AppointmentsRoutes);
app.use('/admins', requestAuth, attachIo(io), AdminRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to Virtual Medical Appointment System API');
});

// Connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        // Listen to the server
        httpServer.listen(process.env.PORT, process.env.HOST, () => {
            console.log(`Database connected.\nServer is running on http://${process.env.HOST}:${process.env.PORT}.`);
        })

    }).catch((error) => {
        console.log(error);
    })
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import UsersRoutes from './Routes/UsersRoutes.js';
import AppointmentsRoutes from './Routes/AppointmentsRoutes.js';

dotenv.config();

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

// app.use(cors()); // httpOnly cookie will not create like this
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true
}));

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

// connect to routes
app.use('/users', UsersRoutes);
app.use('/appointments', AppointmentsRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to Virtual Medical Appointment System API');
});

// Connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        // Listen to the server
        app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
            console.log(`Database connected.\nServer is running on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}.`);
        })

    }).catch((error) => {
        console.log(error);
    })
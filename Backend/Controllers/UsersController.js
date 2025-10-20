import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Users from '../Models/UsersModel.js';
import CentreStatusModel from '../Models/CentreStatusModel.js'
import AppointmentsModel from '../Models/AppointmentsModel.js';

const attachResponseCookie = (_id, res) => {
    const token = jwt.sign({ _id }, process.env.JWT_SECRET_STRING, { expiresIn: '3h' });

    res.cookie('authToken', token, {
        path: '/', // if path is "/api" that cookie works for only "/api" path requests. not for others
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // when https - true, http - false
        sameSite: process.env.COOKIE_SAMESITE, // strict/lax => strict - use in different domain/subdomain. lax - allows other sites get request nor for other type requests(eg: link sharing on social media)
        maxAge: 15*60*1000
    })
}

const signupUser = async (req, res) => {
    const { email, password, firstName, lastName, regNumber, gender, dob, height, weight, address, phone, drugAllergies = [] } = req.body;

    try {
        const user = await Users.Signup({ email, password, firstName, lastName, regNumber, gender, dob, height, weight, address, phone, drugAllergies });
        attachResponseCookie(user._id, res);

        const responseUser = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            regNumber: user.regNumber,
            gender: user.gender,
            dob: user.dob,
            height: user.height,
            weight: user.weight,
            address: user.address,
            phone: user.phone,
            drugAllergies: user.drugAllergies
        };

        res.status(200).json({ user: responseUser, message: 'Signed up successfully!' });

    } catch (error) {
        res.status(401).json({ error: error.message, message: 'Sign up unsuccessful!' });
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.Login(email, password);
        attachResponseCookie(user._id, res);

        const responseUser = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            regNumber: user.regNumber,
            role: user.role,
            gender: user.gender,
            dob: user.dob,
            height: user.height,
            weight: user.weight,
            address: user.address,
            phone: user.phone,
            drugAllergies: user.drugAllergies
        }

        res.status(200).json({ user: responseUser, message: 'Logged in successfully!' });

    } catch (error) {
        res.status(401).json({ error: error.message, message: 'Log in unsuccessful!' });
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('authToken', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // when https - true, http - false
        sameSite: process.env.COOKIE_SAMESITE, // strict/lax => strict - use in different domain/subdomain. lax - allows other sites get request nor for other type requests(eg: link sharing on social media)
    })
    res.status(200).json({ message: 'Logged out successfully!' });
}

const verifyUser = async (req, res) => {
    const token = req.cookies.authToken;

    try {

        if (!token)
            throw Error('Cannot verify user! Token missing.');

        const { _id } = jwt.verify(token, process.env.JWT_SECRET_STRING);

        if (!mongoose.isValidObjectId(_id))
            throw Error('User validation failed!');

        const user = await Users.findById(_id);

        if (!user)
            throw Error('User validation failed!');

        const responseUser = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            regNumber: user.regNumber,
            role: user.role,
            gender: user.gender,
            dob: user.dob,
            height: user.height,
            weight: user.weight,
            address: user.address,
            phone: user.phone,
            drugAllergies: user.drugAllergies
        }

        res.status(200).json({ user: responseUser, message: 'User verified!' });

    } catch (error) {
        res.status(401).json({ error: error.message, message: 'Verification failed!' });
    }
}

const getUserDashbordData = async (req, res) => {
    const regNumber = req.query.regNumber;
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const totalAppointments = await AppointmentsModel.countDocuments({
            appointDate: {
                $gte: today,
                $lt: tomorrow
            }
        });
        const centreStatus = await CentreStatusModel.findById('CENTRE_STATUS_CONFIG');
        const userAppointment = await AppointmentsModel.findOne({ regNumber });

        res.status(200).json({
            centreStatus,
            totalAppointments,
            userAppointment,
            message: 'User dashbord data fetching success.'
        })

    } catch (error) {
        console.error("getUserDashbordData error ", error);
    }
}

export { signupUser, loginUser, logoutUser, verifyUser, getUserDashbordData };
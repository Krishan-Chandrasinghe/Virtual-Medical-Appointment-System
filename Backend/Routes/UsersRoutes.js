import express from 'express';
// import rateLimit from 'express-rate-limit';
import { signupUser, loginUser, logoutUser, verifyUser } from '../Controllers/UsersController.js';

const router = express.Router();

// const loginLimiter = rateLimit({
//     windowMs: 30 * 60 * 1000,
//     max: 5,
//     message: { error: 'Too many login attamps! Please try again later.' },
//     statusCode: 429
// });

// Sign Up
router.post('/signup', signupUser);

// Log in
//router.post('/login', loginLimiter, loginUser); // use this after finished the testing for prevent brute force attacks. because its blocking attempts for specific IP.
router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/verify', verifyUser);

export default router;
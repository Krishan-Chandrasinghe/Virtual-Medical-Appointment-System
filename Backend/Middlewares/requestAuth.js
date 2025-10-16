import jwt from 'jsonwebtoken';
import User from '../Models/UsersModel.js';

async function requestAuth(req, res, next) {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ error: 'Access token required!' });
    }

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET_STRING);
        const user = await User.findById(_id).select('_id');
        req.user_id = user._id;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Access unauthorized!' });
    }
}

export default requestAuth;
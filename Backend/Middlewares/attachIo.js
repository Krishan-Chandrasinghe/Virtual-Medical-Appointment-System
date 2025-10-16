const attachIo = (io) => {
    return (req, res, next) => {
        req.io = io;
        next();
    };
};

export default attachIo;
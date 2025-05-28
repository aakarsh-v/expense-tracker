const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
            .json({
                message: "Authorization header is missing"
            })
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403)
            .json({
                message: "Invalid token",
                error: error.message
            })
    }
}

module.exports = ensureAuthenticated;
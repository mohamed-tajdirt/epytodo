const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ msg: 'No token, authorization denied' });
    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user_id = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
}

module.exports = authToken;

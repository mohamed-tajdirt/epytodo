
function badParameter(req, res, next) {
    if (!req || !req.body)
        return res.status(400).json({ msg: 'Bad parameter' });
    next();
}

module.exports = badParameter;

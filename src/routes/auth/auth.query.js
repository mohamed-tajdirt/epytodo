const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = (req, res) => {
    const { email, password, name, firstname } = req.body;

    if (!email || !password || !name || !firstname)
        return res.status(400).json({ msg: 'Bad parameter' });
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err)
            return res.status(500).json({ msg: 'Internal server error' });
        if (results.length > 0)
            return res.status(409).json({ msg: 'Account already exists' });
        const hashedPassword = bcrypt.hashSync(password, 10);
        db.query(
            'INSERT INTO user (email, password, name, firstname, created_at) VALUES (?, ?, ?, ?, NOW())',
            [email, hashedPassword, name, firstname],
            (err, result) => {
                if (err) return res.status(500).json({ msg: 'Internal server error' });
                const token = jwt.sign({ id: result.insertId }, process.env.SECRET);
                return res.status(201).json({ token });
            }
        );
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ msg: 'Bad parameter' });
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err)
            return res.status(500).json({ msg: 'Internal server error' });
        const user = results[0];
        if (!user || !bcrypt.compareSync(password, user.password))
            return res.status(400).json({ msg: 'Invalid Credentials' });
        const token = jwt.sign({ id: user.id }, process.env.SECRET);
        return res.status(200).json({ token });
    });
};

module.exports = { registerUser, loginUser };

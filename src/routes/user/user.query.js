const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const formatDate = require('../../utils/formatDate')


const getCurrentUser = (req, res) => {
    const user_id = req.user_id
    db.query("SELECT * FROM user WHERE id = ?", [user_id], (err, results) => {
        if (err)
            return res.status(500).json({ msg: 'Internal server error' });
        if (results.length === 0)
            return res.status(404).json({msg: "User not found."});
        return res.status(200).json({
                id: results[0].id,
                email: results[0].email,
                password: results[0].password,
                created_at: formatDate(results[0].created_at),
                firstname: results[0].firstname,
                name: results[0].name
        });
    });
};

const getUserTodos = (req, res) => {
    const user_id = req.user_id
    db.query("SELECT * FROM todo WHERE user_id = ?", [user_id], (err, results) => {
        if (err)
            return res.status(500).json({ msg: 'Internal server error' });
        const formattedTodos = results.map(todo => ({
            id: todo.id,
            title: todo.title,
            description: todo.description,
            created_at: formatDate(todo.created_at),
            due_time: formatDate(todo.due_time),
            user_id: todo.user_id,
            status: todo.status
        }));
        return res.status(200).json(formattedTodos);
    });
};

const getUserinfo = (req, res) => {
    const user_id = req.params.id;

    if (!user_id)
        return res.status(400).json({ msg: "Bad parameter" });

    db.query("SELECT * FROM user WHERE id = ?", [user_id], (err, results) => {
        if (err)
            return res.status(500).json({ msg: 'Internal server error' });
        if (results.length === 0) {
            return db.query("SELECT * FROM user WHERE email = ?", [user_id], (err, result) => {
                if (err)
                    return res.status(500).json({ msg: 'Internal server error' });
                if (result.length === 0)
                    return res.status(404).json({ msg: "User not found." });
                return res.status(200).json({
                    id: result[0].id,
                    email: result[0].email,
                    password: result[0].password,
                    created_at: formatDate(result[0].created_at),
                    firstname: result[0].firstname,
                    name: result[0].name
                });
            });
        }
        return res.status(200).json({
            id: results[0].id,
            email: results[0].email,
            password: results[0].password,
            created_at: formatDate(results[0].created_at),
            firstname: results[0].firstname,
            name: results[0].name
        });
    });
};

const updateUser = (req, res) => {
    const userId = req.params.id;
    const { email, password, name, firstname } = req.body;

    if (!email || !password || !name || !firstname)
        return res.status(400).json({ msg: 'Bad parameter' });
    const query = `UPDATE user SET email = ?, password = ?, name = ?, firstname = ?  WHERE id = ?`;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query(query, [email, hashedPassword, name, firstname, userId], (err, results) => {
        if (err)
            return res.status(500).json({ msg: 'Internal server error' });
        if (results.affectedRows === 0)
            return res.status(404).json({ msg: 'Not found' });
        db.query("SELECT * FROM user WHERE id = ?", [userId], (err, user) => {
            if (err)
                return res.status(500).json({ msg: 'Internal server error' });
            return res.status(201).json({
                id: user[0].id,
                email: user[0].email,
                password: user[0].password,
                created_at: formatDate(user[0].created_at),
                firstname: user[0].firstname,
                name: user[0].name
            });
        });
    });
};

const deleteUser = (req, res) => {
    const userId = req.params.id;
    db.query("DELETE FROM todo WHERE user_id = ?", [userId], (err, result) => {
        if (err)
            return res.status(500).json({ msg: 'Internal server error' });
        db.query('DELETE FROM user WHERE id = ?', [userId], (err, result) => {
            if (err)
                return res.status(500).json({ msg: 'Internal server error' });
            if (result.affectedRows === 0)
                return res.status(404).json({ msg: 'User not found.' });
            return res.status(200).json({ msg: `Successfully deleted record number: ${userId}` });
        });
    })
};

module.exports = { getCurrentUser, getUserTodos, updateUser, deleteUser, getUserinfo };

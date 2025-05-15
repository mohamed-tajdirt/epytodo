const db = require('../../config/db');
const formatDate = require('../../utils/formatDate')

const getTodos = (req, res) => {
    db.query("SELECT * FROM todo", (err, results) => {
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

const getTodosById = (req, res) => {
    const task_id = req.params.id;
    db.query("SELECT * FROM todo WHERE id = ?", [task_id], (err, results) => {
        if (err)
            return res.status(500).json({ msg: 'Internal server error' });
        if (results.length === 0)
            return res.status(404).json({msg: "Task not found."});

        return res.status(200).json({
                id: results[0].id,
                title: results[0].title,
                description: results[0].description,
                created_at: formatDate(results[0].created_at),
                due_time: formatDate(results[0].due_time),
                user_id: results[0].user_id,
                status: results[0].status
        });
    });
};

const postTodos = (req, res) => {
    const { title, description, due_time, status, user_id } = req.body;
    if (!title || !description || !due_time || !status || !user_id)
        return res.status(400).json({ msg: 'Bad parameter' });
    const sql = `
        INSERT INTO todo (title, description, due_time, status, user_id, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())`;
    db.query(sql, [title, description, due_time, status, user_id], (err, results) => { // user_id need to be the token or one the body ?
        if (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
        const insert_id = results.insertId;
        db.query('SELECT * FROM todo WHERE id = ?', [insert_id], (err, results) => {
            if (err)
                return res.status(500).json({ msg: 'Internal server error' });
            return res.status(201).json({
                id: results[0].id,
                title: results[0].title,
                description: results[0].description,
                created_at: formatDate(results[0].created_at),
                due_time: formatDate(results[0].due_time),
                user_id: results[0].user_id,
                status: results[0].status
            });
        });
    });
};

const updateTodos = (req, res) => {
    const task_id = req.params.id;
    const { title, description, due_time, status, user_id } = req.body;
    if (!title || !description || !due_time || !status || !user_id)
        return res.status(400).json({ msg: 'Bad parameter' });
    const query = `UPDATE todo SET title = ?, description = ?, due_time = ?, status = ?, user_id = ?  WHERE id = ?`;
    db.query(query, [title, description, due_time, status, user_id, task_id], (err, results) => { // user_id need to be the token or one the body ?
        if (err)
            return res.status(500).json({ msg: 'Internal server error' });
        if (results.affectedRows === 0)
            return res.status(404).json({ msg: 'Task not found' });
        db.query("SELECT * FROM todo WHERE id = ?", [task_id], (err, user) => {
            if (err)
                return res.status(500).json({ msg: 'Internal server error' });
            return res.status(201).json({
                id: user[0].id,
                title: user[0].title,
                description: user[0].description,
                created_at: formatDate(user[0].created_at),
                due_time: formatDate(user[0].due_time),
                user_id: user[0].user_id,
                status: user[0].status
            });
        });
    });
}

const deleteTodos = (req, res) => {
    const task_id = req.params.id;
    db.query('DELETE FROM todo WHERE id = ?', [task_id], (err, result) => { // check if the todo was create by token's user_id ?
        if (err)
            return res.status(500).json({ msg: 'Internal server error' });
        if (result.affectedRows === 0)
            return res.status(404).json({ msg: 'Task not found.' });
        return res.status(200).json({ msg: `Successfully deleted record number: ${task_id}` });
    });
};

module.exports = { getTodos, getTodosById, postTodos, updateTodos, deleteTodos };

const express = require('express');
require('dotenv').config();
const notFound = require('./middleware/notFound');
const auth = require('./routes/auth/auth.js');
const user = require('./routes/user/user.js');
const todos = require('./routes/todos/todos.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
      return res.status(400).json({ msg: 'Invalid JSON' });
    }
    if (err)
        return res.status(500).json({msg: 'Internal server error'});
    next();
});


app.use('/', auth)
app.use('/', user)
app.use('/', todos)
app.use(notFound);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

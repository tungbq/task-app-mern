const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000;

const userRoutes = require('./routes/userRoutes.js');

const User = require('./models/userModel.js');
const Todos = require('./models/todosModel.js');

connectDB();

app.use(cors());

app.use(express.json());

app.use('/', userRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.post('/todos', async (req, res) => {
	const { authorization } = req.headers;
	const [, token] = authorization.split(' ');
	const [username, password] = token.split(':');

	const todosItems = req.body;
	const user = await User.findOne({ username }).exec();

	if (!user || user.password !== password) {
		return res.status(403).send({
			message: 'Invalid login!',
		});
	}

	const todos = await Todos.findOne({ userID: user._id }).exec();

	if (!todos) {
		await Todos.create({
			userID: user._id,
			todos: todosItems,
		});
	} else {
		todos.todos = todosItems;
		await todos.save();
	}

	res.json(todos);
});

app.get('/todos', async (req, res) => {
	const { authorization } = req.headers;
	const [, token] = authorization.split(' ');
	const [username, password] = token.split(':');

	const todosItems = req.body;
	const user = await User.findOne({ username }).exec();

	if (!user || user.password !== password) {
		return res.status(403).send({
			message: 'Invalid login!',
		});
	}

	const { todos } = await Todos.findOne({ userID: user._id }).exec();
	res.json(todos);
});

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
});

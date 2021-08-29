const User = require('../models/userModel.js');
const Todos = require('../models/todosModel.js');

// @desc    Get todos
// @route   GET /login
// @access  Private
const getTodo = async (req, res) => {
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
};

// @desc    Update todos
// @route   POST /todos
// @access  Private
const updateTodo = async (req, res) => {
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
};

module.exports = { getTodo, updateTodo };

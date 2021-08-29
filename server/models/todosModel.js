const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
	userID: String,
	todos: [
		{
			checked: Boolean,
			text: String,
			_id: String,
		},
	],
	password: String,
});
const Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;

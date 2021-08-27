const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const mongoose = require('mongoose');
require('dotenv').config();

user = process.env.MONGO_USER;
pwd = process.env.MONGO_PWD;

mongoose.connect(`mongodb://${user}:${pwd}@localhost:27018/todo_list`, {
	authSource: 'admin',
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

mongoose.connection.on('error', (err) => {
	console.log(err);
});

// define a schema
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
});
const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.post('/register', async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username }).exec();

	if (user) {
		return res.status(500).send({
			message: 'User is already exists!',
		});
	}

	await User.create({ username, password });

	res.send({
		message: 'success',
	});
});

app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username }).exec();

	if (!user || user.password !== password) {
		return res.status(403).send({
			message: 'Invalid login!',
		});
	}

	await User.create({ username, password });

	res.send({
		message: 'success',
	});
});

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
});

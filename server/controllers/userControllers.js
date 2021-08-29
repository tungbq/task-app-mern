const User = require('../models/userModel.js');

// @desc    Auth user
// @route   POST /login
// @access  Public
const authUser = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username }).exec();

	if (!user || user.password !== password) {
		return res.status(403).send({
			message: 'Invalid email or password!',
		});
	}

	await User.create({ username, password });

	res.send({
		message: 'success',
	});
};

// @desc    Register user
// @route   POST /register
// @access  Public
const registerUser = async (req, res) => {
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
};

module.exports = { authUser, registerUser };

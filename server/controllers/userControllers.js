const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');

// @desc    Auth user
// @route   POST /login
// @access  Public
const authUser = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username }).exec();

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.username,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password!');
	}

	await User.create({ username, password });

	res.send({
		message: 'success',
		token: generateToken(user._id),
	});
};

// @desc    Register user
// @route   POST /register
// @access  Public
const registerUser = async (req, res) => {
	const { username, password } = req.body;
	const userExists = await User.findOne({ username }).exec();

	if (userExists) {
		return res.status(500).send({
			message: 'User is already exists!',
		});
	}

	const user = await User.create({ username, password });

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.username,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
};

module.exports = { authUser, registerUser };

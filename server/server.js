const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

dotenv.config();
const PORT = process.env.PORT || 4000;

const userRoutes = require('./routes/userRoutes.js');
const todoRoutes = require('./routes/todoRoutes.js');

connectDB();

app.use(cors());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use(express.json());

app.use('/', userRoutes);
app.use('/', userRoutes);

app.use('/', todoRoutes);
app.use('/', todoRoutes);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
	);
} else {
	app.get('/', (req, res) => {
		res.send('API is running...');
	});
}

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
});

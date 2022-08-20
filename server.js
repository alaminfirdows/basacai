require('dotenv').config({ path: './config.env' });
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cloudianry = require('cloudinary');
const http = require('http');
const helmet = require('helmet');
const compression = require('compression');
const { allowedDomains } = require('./index');

const app = express();
app.use(
	helmet.contentSecurityPolicy({
		useDefaults: true,
		directives: {
			'img-src': ["'self'", 'https: data:'],
		},
	})
);
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(compression());
app.use(express.json());
app.use(cors({ origin: allowedDomains, credentials: true }));
app.use(cookieParser());
app.use(
	fileUpload({
		useTempFiles: true,
	})
);

app.use('/api/ping', async (req, res) => {
	res.status(200).json({ msg: 'pong' });
});

app.use('/api', require('./routes/homesRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/api', require('./routes/uploadRoutes'));
app.use('/api', require('./routes/newsRoutes'));

cloudianry.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

const PORT = process.env.PORT;

// database connection
mongoose
	.connect(process.env.MONGODB_URL)
	.then((db) => console.log('Database is connected'))
	.catch((err) => console.log(err));

// attach client
if (process.env.NODE_ENV !== 'production') {
	app.use(express.static(path.resolve(__dirname, 'client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
} else {
	app.use(express.static(path.resolve(__dirname, 'public')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
	});
}

// run server
server = http.createServer(app);
server.listen(PORT, () => {
	console.log(`Server is running on port no ${PORT}`);
});

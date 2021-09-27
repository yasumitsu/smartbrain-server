const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const knex = require('knex')({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'kenji',
		password: '123',
		database: 'smart-brain'
	}
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('it works');
});

app.post('/signin', (req, res) => {
	signin(req, res, knex, bcrypt);
});

app.post('/register', (req, res) => {
	register(req, res, knex, bcrypt);
});

app.get('/profile/:id', (req, res) => {
	profile(req, res, knex);
});

app.put('/image', (req, res) => {
	image(req, res, knex);
});

app.listen(3000, () => {
	console.log('listening on port 3000');
});

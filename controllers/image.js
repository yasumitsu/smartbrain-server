const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: '922c6f0ec67c49d6878b51c1bd308f19'
});

const apiCall = () => (req, res) => {
	app.models
		.predict(Clarifai.CELEBRITY_MODEL, req.body.input)
		.then((data) => res.json(data))
		.catch((err) => res.status(400).json('unable to load from API'));
};

const image = (knex) => (req, res) => {
	const { id } = req.body;
	knex('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then((entries) => res.json(entries[0]))
		.catch((e) => res.status(400).json('unable to get entries'));
};

module.exports = { apiCall, image };

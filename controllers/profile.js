module.exports = Profile = (knex) => (req, res) => {
	const { id } = req.params;
	knex
		.select('*')
		.from('users')
		.where({ id })
		.then((user) => {
			user.length ? res.json(user[0]) : res.status(404).json('not found');
		})
		.catch((err) => res.status(404).json('error getting user'));
};

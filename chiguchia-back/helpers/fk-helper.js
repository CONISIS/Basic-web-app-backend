module.exports = (model, q_name) => {

	return new Promise((resolve, reject) => {

		model.findOne({ name: q_name }, (err, result) => {
			if (result) {
				return resolve(true);
			}
			else return reject(new Error(`FK Constraint 'checkObjectsExists' for '${this.name}' failed`));
		});
	});
};
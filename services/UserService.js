const { Op } = require('sequelize');

class UserService {
	constructor(db) {
		this.client = db.sequelize;
		this.Users = db.Users;
	}

	async create(username, password) {
		return await this.Users.create({
			Username: username,
            Password: password,
		});
	}

	async getOne(username) {
		return await this.Users.findOne({
			where: { username: username },
		});
	}

    async checkPassword(password) {
		return await this.Users.findOne({
			where: { password: password },
		});
	}
}
module.exports = UserService;


const { Op } = require('sequelize');

class ParticipantService {
	constructor(db) {
		this.client = db.sequelize;
		this.Participant = db.Participant;
	}

	async create(Email, FirstName, LastName, Dob, CompanyName, Salary, Currency, Country, City) {
		const search = await this.sequelize.transaction();

        try {
            const company = await this.Company.findOrCreate({
                CompanyName,
                Salary,
                Currency
            }, { transaction: search });

            const location = await this.Location.findOrCreate({
                Country,
                City
            }, { transaction: search });

            const participant = await this.Participant.create({
			Email,
			FirstName,
			LastName,
            Dob,
            CompanyId: company.id,
            LocationId: location.id
		}, { transaction: search });

        await search.commit();
        return participant;

        } catch (error) {
            await search.rollback();
            throw error;
        }

	}

	async getParticipants() {
		return await this.Participant.findAll({
            attributes: ['FirstName', 'LastName']
        });
	}

    async getParticipantsDetails() {
		return await this.Participant.findAll({
            attributes: ['FirstName', 'LastName', 'Email']
        });
	}

    async getParticipantEmail(email) {
		return await this.Participant.findAll({
			where: { Email: email },
            attributes: ['FirstName', 'LastName', 'Dob']
		});
	}

    async getWorkEmail(email) {
		return await this.Participant.findAll({
			where: { Email: email },
            attributes: ['CompanyName', 'Salary', 'Currency']
		});
	}

    async getHomeEmail(email) {
		return await this.Participant.findAll({
			where: { Email: email },
            attributes: ['Country', 'City']
		});
	}

    async deleteEmail(email) {
        return await this.Participant.delete({
            where: { Email: email }
        });
    }

    async update(email, updateData) {
		const participant = await Participant.findOne({
            where: { Email: email } 
        });
        if (!participant) {
                throw new Error('Participant not found');
            }
        return await participant.update(updateData)

    }
}
module.exports = ParticipantService;


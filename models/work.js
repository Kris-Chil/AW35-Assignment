module.exports = (sequelize, Sequelize) => {
	const Work = sequelize.define(
		'Work',
		{
			CompanyName: Sequelize.DataTypes.STRING,
			Salary: Sequelize.DataTypes.INTEGER,
            Currency: Sequelize.DataTypes.STRING
		},
		{
			timestamps: false,
		}
	);

	return Work;
};

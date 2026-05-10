module.exports = (sequelize, Sequelize) => {
	const Work = sequelize.define(
		'Work',
		{
			CompanyName: Sequelize.DataTypes.STRING,
			Salary: Sequelize.DataTypes.INT,
            Currency: Sequelize.DataTypes.STRING
		},
		{
			timestamps: false,
		}
	);

	return Work;
};

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface ClickAttributes {
	id: number;
	clickValue: number;
	timestamp: Date;
	userId: number;
}

interface ClickCreationAttributes extends Optional<ClickAttributes, 'id'> { }

class Click extends Model<ClickAttributes, ClickCreationAttributes> implements ClickAttributes {
	public id!: number;
	public clickValue!: number;
	public timestamp!: Date;
	public userId!: number;
}

export const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './database.sqlite',
});

Click.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		clickValue: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		timestamp: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'clicks',
		timestamps: false,
	}
);

interface UserAttributes {
	id: number;
	username: string;
	password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
	public id!: number;
	public username!: string;
	public password!: string;
	//public failedAttempts!: number;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: 'users',
		timestamps: false,
	},
	/* failedAttempts: {
	   type: DataTypes.INTEGER,
	   allowNull: false,
	   defaultValue: 0, // Set default failed attempts to 0
	 },*/
);

User.hasOne(Click, { foreignKey: 'userId' });
Click.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync().then(() => {
	console.log('Database & tables created!');
});

export { User, Click };
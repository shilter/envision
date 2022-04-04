import 'dotenv/config'; 
import Sequelize from 'sequelize';
import users from './users.js';
import messages from './messages.js';

const sequelized = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

sequelized.authenticate()
  .then(() => {
    console.log('connected to DB');
  });
  
const model = {
  users: users(sequelized, Sequelize.DataTypes),
  messages: messages(sequelized, Sequelize.DataTypes),
};

Object.keys(model).forEach(key => {
  if('associate' in model[key]) {
    model[key].associate(model);
  }
});

export { sequelized };
export default model;
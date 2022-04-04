const users = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        firstname: {
            type: DataTypes.STRING,
            unique:false,
            allowNull:false,
            validate: {
                notEmpty:true,
            },
        },
        lastname:{
            type: DataTypes.STRING,
            allowNull:true
        },
        dateOfBirth: {
            type: DataTypes.STRING,
            allowNull:true
        },
        location: {
            type: DataTypes.STRING,
            allowNull:true,
        }
    });

    return Users;
};


export default users;
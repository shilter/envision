const messages = (sequelize, DataTypes) => {
    const Messages = sequelize.define('messages', {
        users: {
            type:DataTypes.INTEGER,
            allowNull:true
        },
        messages:{
            type: DataTypes.STRING,
            allowNull:true
        },
    });

    return Messages;
};


export default messages;
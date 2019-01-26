module.exports = function(sequelize,Sequelize){
    let User = sequelize.define('user',{
        id : {
            type : Sequelize.UUID,
            primaryKey : true
        },
        name : {
            type: Sequelize.STRING
        },
        email : {
            type : Sequelize.STRING
        },
        password : {
            type: Sequelize.STRING
        }
    },{
        freezeTableName : true
    });

    User.sync({force: false}).then(() => {
        // Table created
        console.log("User table created")
    });
    return User;
}
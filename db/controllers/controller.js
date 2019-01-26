let { sequelize, Sequelize } = require('../index');

let User = require('../models/users')(sequelize,Sequelize);
let userController = require('./userController');

let createUser = async (name,email,password) =>{
    try{
        await userController.create(User,name,email,password);
        return {
            code : 200,
            message : "User inserted successfully into the database"
        }
    }
    catch(err){
        throw err.toString();
    }
}

let checkPassword = async (email,password) =>{
    try{
        let result = await userController.checkPassword(User,email,password);
        if (result){
            return {
                code : 200,
                message : "Login successfull"
            }
        }
        else{
            return {
                code : 400,
                message : "Wrong password"
            }
        }
    }
    catch(err){
        throw err.toString();
    }
}

module.exports = {
    createUser,
    checkPassword
}



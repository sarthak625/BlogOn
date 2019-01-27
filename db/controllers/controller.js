let { sequelize, Sequelize } = require('../index');

let User = require('../models/users')(sequelize, Sequelize);
let Blog = require('../models/blogs')(sequelize, Sequelize);
let userController = require('./userController');
let blogController = require('./blogController');

let createUser = async (name, email, password) => {
    try {
        await userController.create(User, name, email, password);
        return {
            code: 200,
            message: "User inserted successfully into the database"
        }
    }
    catch (err) {
        throw err.toString();
    }
}

let checkPassword = async (email, password) => {
    try {
        let result = await userController.checkPassword(User, email, password);
        if (result.success) {
            return {
                code: 200,
                message: "Login successfull",
                name: result.name
            };
        }
        else if (result.success === false){
            return {
                code: 400,
                message: "Wrong password"
            };
        }
        else{
            return {
                code : 404,
                message: "Password is wrong"
            };
        }
    }
    catch (err) {
        throw err.toString();
    }
}

let createBlog = (title, subtitle, content, author, file) => {
    // author, createdOn, image
    let createdOn = new Date();
    
    blogController.create(Blog, title, subtitle, content, author, createdOn, file);
    return {
        code: 200,
        message: "Blog created successfully"
    };
}

module.exports = {
    createUser,
    checkPassword,
    createBlog
}



let uuid = require('uuid/v1');
let bcrypt = require('bcryptjs');

let create = (User,name,email,password)=>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            User.create({
                id          : uuid(),
                name        : name,
                email       : email,
                password    : hash
            });
        });
    });
}

let compare = (pass,password) => new Promise((resolve,reject)=>{
    bcrypt.compare(pass,password,(err,result)=>{
        if (err) reject(err);
        else resolve(result);
    });
});

let checkPassword = async (User,email,pass)=>{
    let project = await User.findOne({
        where : {
            email : email
        }
    })

    if (project && project.dataValues){
        let { password,name } = project.dataValues;
        let result = await compare(pass,password);
        return {
            name : name,
            success :result
        };
    }
    else{
        return {
            code : 404,
            message : "User does not exists"
        };
    }

}

module.exports = {
    create,
    checkPassword
}
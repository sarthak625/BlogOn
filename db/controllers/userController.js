let uuid = require('uuid/v1');
let bcrypt = require('bcryptjs');

let create = (User,name,email,password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(10, function(err, salt) {
            if (err) reject(err);
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) reject(err);
                let user = User.create({
                    id          : uuid(),
                    name        : name,
                    email       : email,
                    password    : hash
                });
                resolve(user);
            });
        });
    })
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
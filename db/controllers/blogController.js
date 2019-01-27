const uuid = require('uuid/v1');

let create = ( Blog,title,subtitle,content,author,createdOn,image )=>{
    if (image){
        return Blog.create({
            id : uuid(),
            title,
            subtitle,
            content,
            author,
            createdon:createdOn,
            image: image.buffer,
            imagename: image.originalname
        });
    }
    else{
        return Blog.create({
            id : uuid(),
            title,
            subtitle,
            content,
            author,
            createdon:createdOn,
            image: null,
            imagename: null
        });
    }
}

module.exports = {
    create
}
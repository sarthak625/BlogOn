module.exports = function(sequelize,Sequelize){
    let Blog = sequelize.define('blog',{
        id : {
            type : Sequelize.UUID,
            primaryKey : true
        },
        title : {
            type: Sequelize.STRING
        },
        subtitle : {
            type : Sequelize.STRING
        },
        content : {
            type : Sequelize.TEXT
        },
        author : {
            type: Sequelize.STRING
        },
        createdon:{
            type : Sequelize.DATE
        },
        image:{
            type: Sequelize.BLOB
        },
        imagename: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName : true
    });

    Blog.sync({force: false}).then(() => {
        // Table created
        console.log("Blog table created")
    });
    return Blog;
}
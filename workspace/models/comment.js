const Sequelize = require("sequelize")

module.exports  = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            comment : {
                type : Sequelize.STRING(120),
                allowNull : false,
            },
            create_at : { 
                type : Sequelize.DATE,
                allowNull : false,
                defaultValue : Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps : false,
            modelName : 'Comment',
            talbeBName : 'comments',
            paranoid : false, 
            charset : 'utf8mb4',
            collate : 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Comment.belongsTo(db.User, { foreignKey : 'commenter',targetKey : 'id'});
    }
} 
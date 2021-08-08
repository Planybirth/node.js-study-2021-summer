const Sequelize = require('sequelize');

// extends : 상속을 받는다.
// 상속을 받는다.
// public, protected 메소드나, 멤버 변수를 사용을 하겠다는 말.
// 자바 스크립트는 public만 있다. 그렇기 때문에 형식적인 것으로 보면 된다.
module.exports = class User extends Sequelize.Model{
    // 생성자 : 클래스를 생성할 때 자동을 실행되는 메서드
    static init(sequelize){
        // 부모 클래스에 접근할 때
        // super를 사용한다.
        return super.init({
            name : {
                //STRING === VARCHAR
                type : Sequelize.STRING(20),
                allowNull : false,
                unique : true,
            },
            age : {
                type : Sequelize.INTEGER.UNSIGNED,
                allowNull : false,
            },
            married : {
                type : Sequelize.BOOLEAN,
                allowNull : false,
            },
            comment : {
                type : Sequelize.TEXT,
                allowNull : true,
            },
            create_at : {
                type : Sequelize.DATE,
                allowNull : false,
                defaultValue : Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps : false,
            underscored : false,
            modelName : 'User',
            tableName : 'users',
            paranoid : false,
            charset : 'utf8',
            collate : "utf8_general_ci",
        });
    }

    static associate(db) {
        db.User.hasMany(db.Comment, {foreignKey : 'commenter', sourceKey : 'id'});
    }

    
}
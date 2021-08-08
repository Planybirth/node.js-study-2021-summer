function funcAndSaveUser(Users){
    Users.findOne({}, (err, user) =>{
        if(err){
            return console.err(err);
        }
        user.name= 'cha';
        user.save((err) => {
            if(err) {
                return console.err(err);
            }
            Users.findOne({ gender : 'm'}, (err, user) = {

            });
        });
    });
} // 아주 더러운 코드. 콜백 함수가 3개나 있다.

function findAndSaveUser(Users) {
    Users.findOne({})
        .then((user) => {
            user.name = 'cha';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({gender : 'm'});
        })
        .then((user) => {
            // 생략
        })
        .catch((err) => {
            console.error(err);
        });
}
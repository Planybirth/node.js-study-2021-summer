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

// async / await
async function finadAndSaveUser(Users) {
    try{
        let user = await Users.findOne({});
        user.name='cha';
        // await : 리턴 같은 것. 여기서는 비동기적인 return이다. 굳이 끝나기만을 기다리진 않음.
        user = await user.save();
        user = await Users.findOne({gender : 'm'})
    } catch(err){
        console.error(err);
    }
}

const findAndSaveUserVer = async(Users) => {
    try{
        let user = await Users.findOne({});
        user.name='cha';
        // await : 리턴 같은 것. 여기서는 비동기적인 return이다. 굳이 끝나기만을 기다리진 않음.
        user = await user.save();
        user = await Users.findOne({gender : 'm'})
    } catch(err){
        console.error(err);
    }
}
let relation1 = {
    name : 'cha',
    friend : ['솔빈', '재은', '정민'],
    logFriend : function(){
        let that = this; // 자기 자신을 가져온다.
        //for (int i = 0; i<arr.length; ++i) {
        // cout << arr[i] << endl
        //}
        
        //foreach(int i : arr){
        // cout << i << endl;
        //}
        this.friends.forEach(function (friend) {
            console.log(that.name,friend);
        });
    },
};

let relation1 = {
    name : 'cha',
    friend : ['솔빈', '재은', '정민'],
    logFriend(){
        this.friends.forEach(friend => {
            console.log(that.name, friend);
        });
    },
};
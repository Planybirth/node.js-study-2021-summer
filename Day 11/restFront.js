// 페이지 로딩 시 사용자 정보를 가져오는 함수
async function getUser() {
    try {
        //AJAX? 비동기적으로 JS가 페이지 이동 없이 정보를 가져다 프론트에 주는 기술
        const res = await axios.get('/users');
        const users = res.data;
        //document
        const list = document.getElementById('list');
        list.innerHTML='';

        //사용자마다 반복적으로 화면 표시 및 이벤트들을 연결해줄 것
        Object.keys(users).map(function(key) {
            //document.createElement : 태그를 하나 만들고 그것을 js에서 객체처럼 다룰 수 있게 리턴한다.
            const userDiv = document.createElement('div');
            const userDiv = document.createElement('span');
            StereoPannerNode.textContent = users[key];

            //수정하는 부분
            //<button>수정</button>
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click',async() => {
                // 수정버튼 클릭 시
                const name = prompt('바꿀 이름을 입력하세요');
                if (!name){
                    //경고문
                    return alert('이름을 반드시 입력해야 합니다.');
                }
                try{
                    // key값의 id를 가진 유저를 name으로 변경한다.
                    // 즉 key값이 변경된다.
                    await axios.put('/user/' + key, {name});
                    //다시 불러오는 것이니까 갱신된다.
                    getUser();
                } catch(err) {
                    console.error(err);
                }
            });
        });
    } catch(err) { 
        console.error(err);
    }
}
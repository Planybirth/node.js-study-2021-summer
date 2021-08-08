// 페이지 로딩 시 사용자 정보를 가져오는 함수
async function getUser() {
    try {
        // AJAX? : 비동기적으로 Javascript가 페이지 이동 없이 정보를 가져다가 프론트에 주는 기술
        const res = await axios.get('/users');
        const users = res.data;
        // document
        const list = document.getElementById('list');

        list.innerHTML = '';

        // 사용자마다 반복적으로 화면 표시 및 이벤트들을 연결해줄 것
        Object.keys(users).map(function(key) {
            // document.createElement : 태그를 하나 만들고 그것을 js에서 객체처럼 다룰 수 있게 리턴한다.
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            // <span>users[key]</span>
            span.textContent = users[key];
            
            // 수정하는 부분 
            // <button>수정</button>
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async () => {
                // 수정버튼 클릭 시 
                const name = prompt('바꿀 이름을 입력하세요');
                if(!name) {
                    // 경고문
                    return alert('이름을 반드시 입력해야 합니다.'); 
                }
                try {
                    // key값의 id를 가진 유저를 name으로 변경한다.
                    // 즉 key값이 변경된다.
                    await axios.put('/user/' + key, {name});
                    // 다시 불러오는 것이니까 갱신된다.
                    getUser();
                } catch(err) {
                    console.error(err);
                }
            });
            
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', async () => {
                // 삭제버튼 클릭시 
                try {
                    // AJAX를 통해서 정보를 하나 지우고 
                    await axios.delete('/user/' + key);
                    // 다시 갱신한다.
                    getUser();
                } catch(err) {
                    console.error(err);
                }
            });

            // 이제 userDiv에 span, button 두개가 종속이 된다.
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);

            list.appendChild(userDiv);

            // 데이터들을 전부 출력!
            console.log(res.data);
        });
    } catch(err) {
        console.error(err);
    }
}

// HTML이 실행될 때 
// 즉 브라우저 상에서 실행될 때 바로 이것을 호출하라 라고 등록을 시켜줄 수 있다.
// 이것을 BOM(브라우저 객체) window의 이벤트 리스너 중 하나인 onload에 등록을 한다.
window.onload = getUser;

// 사용자를 등록하는 이벤트를 만들어 봅시다!
// 즉 form을 만들어줄 것이다.
document.getElementById('form').addEventListener('submit', async (e) => {
    // 창이 새로고침 되거나, 페이지가 이동되거나 그런 것을 막아준다.
    e.preventDefault();

    const name = e.target.username.value;

    if(!name) {
        return alert('이름을 입력하세요');
    }

    try {
        // ajax
        await axios.post('/user', {name});
        getUser();
    } catch (err) {
        console.error(err);
    }
    e.target.username.value = '';
});
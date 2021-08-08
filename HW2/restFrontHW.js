// 서버가 하는 것 : 요청 받은 것을 응답한다.
// 요청의 종류 : CRUD ( CREATE, READ, UPDATE, DELETE )
// CRUD를 세분화 한 것 : REST ( GET, POST, PUT, PATCH, DELETE )
// REST API를 통해 HTTP 프로토콜 상에서 클라이언트-서버 간의 요청 & 송신을 해주게 한다.

// RESTFUL 서버 구축을 위해 구현해야 할 것들
// 1. GET / restFront.HTML, about.HTML, /users ( 파일이 아닌 사용자 목록 데이터 ), 정적 파일 ( CSS )
// 2. POST / /user(사용자 정보 등록), /put /user/userid, (사용자 정보 수정 )
// 3. DELETE / /user/userid ( 사용자 정보 삭제 )

//* PATCH, PUT의 차이점 : PATCH는 자원 일부분을 수정하고, PUT은 자원을 치환하여 전체를 수정한다.

async function getUser() {
    try {
        //AJAX? 비동기적으로 JS가 페이지 이동 없이 정보를 가져다 프론트에 주는 기술
        const res = await axios.get('/users'); //axios 라이브러리를 사용하여 정보들을 데이터베이스로부터 가져온다.
        const users = res.data;
        const list = document.getElementById('list');  //document. = DOM 객체. 문서 객체로 <body>, <div> 따위의 태그를 주로 지칭한다.
        list.innerHTML=''; // list 내부에 포함된 HTML / XML 마크업을 가져오거나 설정한다.

        //사용자마다 반복적으로 화면 표시 및 이벤트들을 연결해줄 것
        Object.keys(users).map(function(key) {
            //document.createElement : 태그를 하나 만들고 그것을 js에서 객체처럼 다룰 수 있게 리턴한다.
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            // <span>users[key]</span>
            // createElement는 </div>, </span> 처리를 위해 재입력할 필요가 없다. 자동으로 처리해 준다.
            span.textContent = users[key];

            //수정하는 부분
            //<button>수정</button>
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click',async() => {
                // 수정버튼 클릭 시
                const name = prompt('바꿀 이름을 입력하세요');
                if (!name){ // 이름이 없으면
                    return alert('이름을 반드시 입력해야 합니다.');
                }
                try{
                    // key값의 id를 가진 유저('/user/' + key)를 name으로 변경한다. 즉 key값을 변경한다.
                    await axios.put('/user/' + key, {name}); // 일반적으로 async를 사용하여 await axios 구문을 사용한다고 한다. / or promise
                    getUser(); //다시 불러오는 것이니까 갱신된다.
                } catch(err) {
                    console.error(err);
                }
            });

            const remove = document.createElement('button');
            remove.textContent('삭제');
            remove.addEventListener('click', async() => {
                // 삭제버튼을 클릭할 때
                try {
                    // AJAX를 통해서 정보를 하나 지운다.
                    await axios.delete('/user/' + key); // /user'/' / 빼먹으면 안된다
                    // 갱신사항 반영
                    getUser();
                } catch(err) {
                    console.error(err);
                }
            });
        });
        userDiv.appendChild(span);
        userDiv.appendChild(edit);
        userDiv.appendChild(remove); // userDiv에 appendChild를 사용하여 위 3개 항목을 종속시켜 주었다.

        list.appendChild(userDiv);

        console.log(red.data);
    } catch(err) {
        console.error(err);
    }
}

//HTML이 브라우저 상에서 실행될 때 바로 이것을 호출하라고 등록을 할 수 있다.
//이것을 BOM(브라우저 객체) window의 이벤트 리스너 중 하나인 onload에 등록한다.
window.onload = getUser // 한번에 하나의 window.onload만 사용할 수 있다.

// 사용자를 등록하는 이벤트. form 생성
document.getElementById('form').addEventListener('submit', async(e) => {
    e.preventDefalut(); // 창이 새로고침 되거나 페이지가 이동되는 것을 막아준다. 거의 필수적요소.

    const name = e.target.username.value;

    if(!name) {
        return alert('이름을 입력하세요');
    }

    try {
        await axios.post('/user', {name});
        getUser();
    } catch(err) {
        console.error(err);
    }
    e.target.username.value = '';
});

// 서버가 있어야 페이지가 동작한다.
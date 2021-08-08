// 사용자 이름을 눌렀을 대 댓글이 로딩되는 기능
document.querySelectorAll('#user-list tr').forEach((elem)=>{
    elem.addEventListener('click', ()=> {
        const id = elem.querySelector('td').textContent;
        getComment(id);
    });
});

// 사용자 로딩
async function getUser() {
    try {
        const res = await axios.get('/users');
        const users = res.data;
        console.log(users);

        const tbody = document.querySelector('$#user-list tbody');
        tbody.innerHTML = '';
        users.map(function(user){
            const row = document.createElement('tr');
            
            row.addEventListener('click',()=>{
                getComment(id);
            });
        
            // 로우 셀을 추가한다.
            let td = document.createElement('td');
            td.textContent = user.id;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = user.name;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = user.age;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = user.married ? '기혼' : '미혼';
            row.appendChild(td);

            tbody.appendChild(row);
        });
    } catch(err) {
        console.error(err);
    }
}

// 덧글 로딩
async function getComment(id){
    try { 
        const res = await axios.get(`/users/${id}/comments`);
        const comments = res.data;
        const tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML = '';

        comments. map(function(comment){
            const row = document.createElement('tr');

            let td = document.createElement('td');
            td.textContent = comemnt.id;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = comemnt.User.name;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = comemnt.comment;
            row.appendChild(td);

            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async () => { // 수정을 한다면
                const newComment = prompt('바꿀 내용을 입력하세요');

                if(newComent) {
                    return alert('내용을 반드시 입력해야 합니다.');
                }

                try{
                    //  REST API
                    // post : 데이터를 보낸다
                    // patch : 일부를 수정한다.
                    await axios.patch(`/comments/${comment.id}`, { comment : newComment});
                    getComment(id);
                } catch(err) {
                    
                }
            });

            // 삭제 기능
            const del = document.createElement('button');
            del.textContent = '삭제';
            del.addEventListener('click', async() => {
                try {
                    await axios.delete(`/comments/${comment.id}`);
                    getComment(id);
                } catch(err) {
                    console.error(err);
                }
                
            });

            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);

            td = document.createElement('td');
            td.appendChild(del);
            row.appendChild(td);
            
            tbody.appendChild(row);
        });
    } catch(err) {
        console.error(err);
    }
}

// 사용자 등록
document.getElementById('user-form').addEventListener('submit', async(e) => {
    e.preventDefault();

    const name = e.target.username.value; // 이벤트가 발생한 form을 의미한다.
    const age = e.target.age.value;
    const married = e.target.married.checked;

    if (!name) {
        return alert('이름을 입력하세요');
    }
    
    if (!age) {
        return alert('나이를 입력하세요');
    }

    try {
        await axios.post('/users', {name, age, married});
        getUser();
    } catch(err) {
        console.error(err);
    }

    e.target.username.value = '';
    e.target.age.value = '';
    e.target.married.checked = false;
});

//댓글 등록
document.getElementById('comment-form').addEventListener('submit', async(e) =>{
    e.preventDefault();

    const id = e.target.userid.value;
    const comment = e.target.comment.value;

    if(!id){
        return alert('아이디를 입력하세요');
    }
    
    if(!comment){
        return alert('댓글을 입력하세요');
    }
    
    try {
        await axios.post('/comments', {id, comment});
        getComment(id);
    } catch(err) {
        console.error(err);
    }

    e.target.userid.value = '';
    e.target.comment.value = '';
});
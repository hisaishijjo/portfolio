function ajaxPromiseHelper(url,method='GET') {
    
    return new Promise((resolve,reject)=> {
        const xhr = new XMLHttpRequest();
        xhr.open(method,url);


        xhr.onreadystatechange = e => {
            const ajax = e.target;

            if (ajax.readyState == XMLHttpRequest.DONE) {
                if (ajax.status == 200) {
                    const {responseText} = ajax
                    //promise기법은 콜백 함수를 줄이기 위해 등장한 기법
                    //성공했을 경우 콜백 호출아닌 resolve를 호출함
                    //바깥 실행부분의 .then(function(){...})영역의 콜백함수를 대신 호출해줌
                    const b = JSON.parse(responseText);
                    console.log (b);
                    resolve(b);                    
                }else {
                    const s = parseInt(ajax.status/100);
                    let msg = null;
                    if (s == 4) {
                        msg ='요청 주소가 잘못되었습니다.';
                    }else if (s == 5) {
                        msg = '서버의 응답이 없습니다.';
                    }else {
                        msg = '요청에 실패했습니다.';
                    }

                    //실패했을 경우 콜백 호출아닌 reject를 호출함
                    //바깥 실행부분의 .catch(function(){...})영역의 콜백함수를 대신 호출해줌
                    reject({status:ajax.status,text:ajax.statusText,msg:msg});
                }
            }
        };
        xhr.send();
    });
}

function a(b,c,d,x) {
    document.querySelector(b).addEventListener('click',e=> {
        const btn = document.querySelector(c);
        btn.classList.toggle('on');
        const btn1 = document.querySelector(d);
        
        const btn2 = document.querySelector(x)
        

        btn1.classList.add('on');
        btn2.classList.add('on');

    });
}

//회사소개 버튼위 hover시 박스생성
document.querySelector('#company_btn').addEventListener('mouseover',e=> {
    const btn = document.querySelector('#hover1');
        btn.classList.remove('on');
        const btn1 = document.querySelector('#hover2');
        btn1.classList.add('on');
        const btn2 = document.querySelector('#language_btn1');
        btn2.classList.add('on');
})

//회사소개 박스내에 x버튼 클릭시 회사소개 박스 사라짐
a('#hover1_btn','#hover1');

//검색이미지 클릭시 검색창 등장
a('#search_btn','#hover2','#hover1','#language_btn1');

//검생창 내에 x버튼 클릭시 검색창 사라짐
a('#hover2_btn','#hover2');

//language 클릭시 언어 선택 항목 나옴
a('#language_btn','#language_btn1','#hover2','#hover1');

document.querySelectorAll('.add').forEach((v,i) => {
    v.addEventListener('mouseover',e=> {
        const btn = document.querySelector('#hover1');
        btn.classList.add('on');
        const btn1 = document.querySelector('#hover2');
        btn1.classList.add('on');
        const btn2 = document.querySelector('#language_btn1');
        btn2.classList.add('on');
    })
})



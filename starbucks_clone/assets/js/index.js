//ajax 구현
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

//메뉴바 이벤트 처리
const ul_list = document.querySelector('#ul_list');
const ul_list1 = ul_list.children;
const ul_list2 = Array.from(ul_list1);

const header_div = document.querySelectorAll('.header_div');
const header_div1 = Array.from(header_div);


ul_list2.forEach((v,i)=> {
    v.addEventListener('mouseover',e=> {
        for (let i= 0; i<ul_list2.length; i++) {
            header_div1[i].style.transition = '';
        }
        header_div1[i].style.transition = 'all 1s'
        header_div1[i].style.maxHeight = '1000px';
    })
    header_div1[i].addEventListener('mouseover',e=> {
        const current = e.currentTarget;
        v.style.backgroundColor = '#2c2a29';
        v.style.color = '#669900';
        current.style.maxHeight = '1000px';  
    })
    header_div1[i].addEventListener('mouseout',e=> {
        v.style.backgroundColor = '#f6f5ef';
        v.style.color = '#333';
        const current = e.currentTarget;
        current.style.maxHeight = '0px';  
    })
    v.addEventListener('mouseout',e=> {
        header_div1[i].style.maxHeight = '0px';
    })
})

//노란색 배경 이미지 사진 opacity처리
let content1_img = document.querySelectorAll('#content1 img');
let content1_img1 = Array.from(content1_img);
let content1_a = document.querySelector('#content1 a');

let count = 0
const set = setInterval(() => {
    content1_img1[count].style.transition = 'opacity 0.5s';
    content1_img1[count].style.opacity = '1';
    count++
    if (count>4) {
        content1_a.style.transition = 'opacity 0.5s'
        content1_a.style.opacity = '1'
        clearInterval(set);
    }
}, 500);

//이미지 들어오고 나가는 스크롤 이벤트로 구현


//이미지가 중앙으로 들어올때를 위한 함수
function logic(a1,a2,a3) {
    const a11 = document.querySelector(a1);
    if (a2) {
        a11.style.right = '50%';
        a11.style.transition = a3;
        a11.style.opacity = '1';
    }else {
        a11.style.left = '50%';
        a11.style.transition = a3;
        a11.style.opacity = '1';
    }
}
//이미지가 밖으로 나갈때를 위한 함수
function logic1(a1,a2,a3) {
    const a11 = document.querySelector(a1);
    a11.style.transition = 'all 1.5s';
    a11.style.opacity = '0.8';
    if (a2) {
        a11.style.right = a3;
    }else {
        a11.style.left = a3;
    }
}
//스크롤 이벤트
window.addEventListener('scroll',e=> {
    const scrollTop = window.scrollY;

    const windowHeight = window.screen.availHeight;


    //이미지가 밖으로 나갈때를 위한 이벤트 구현
    if (scrollTop < 10) {
        logic1('#content4 img:nth-of-type(3)',1,'89%');
        logic1('#content4 img:nth-of-type(4)',0,'98%');
        logic1('#content4 a',0,'100%');
        console.log (scrollTop)
    }else if (scrollTop < 1290) {
        logic1('#content6 img:nth-of-type(1)',1,'91%');
        logic1('#content6 img:nth-of-type(2)',1,'91%');
        console.log (scrollTop)
    }else if (scrollTop<2010) {
        logic1('#content8 img:nth-of-type(4)',0,'95%');
        logic1('#content8 img:nth-of-type(5)',0,'95%');
        logic1('#content8 a',0,'91%');
        console.log (scrollTop)

    }
    //이미지가 중앙으로 들어올때를 위한 이벤트 구현
    if (scrollTop + windowHeight > 1350) {
        logic('#content4 img:nth-of-type(3)',1,'right 2.5s, opacity 2.5s');
        logic('#content4 img:nth-of-type(4)',0,'left 2.5s, opacity 2.5s');
        logic('#content4 a',0,'left 2.5s, opacity 2.5s');
    }if (scrollTop + windowHeight > 2450) {
        logic('#content6 img:nth-of-type(1)',1,'right 2s, opacity 2s');
        logic('#content6 img:nth-of-type(2)',1,'right 2.5s, opacity 2.5s');
    }if (scrollTop + windowHeight > 3150) {
        logic('#content8 img:nth-of-type(4)',0,'left 3s, opacity 3s');
        logic('#content8 img:nth-of-type(5)',0,'left 3.5s, opacity 3.5s');
        logic('#content8 a',0,'left 3.8s, opacity 3.8s');
    }
});

//스타벅스 프로모션 버튼 클릭시 이벤트 구현
const promotion = document.querySelector('.content2_float:nth-of-type(2) a');
const promotion_img = document.querySelector('.content2_float:nth-of-type(2) a img:nth-of-type(2)');
const swiper_class = document.querySelector('.mySwiper');
promotion.addEventListener('click',e=> {
    e.preventDefault();
    promotion_img.classList.toggle('rotate11');
    swiper_class.classList.toggle('on');

})

//돋보기 클릭시 input박스 구현
const search = document.querySelector('#search_box img');
const search_input = document.querySelector('#search_box input');
console.log (search_input)
search.addEventListener('click',e=> {
    e.preventDefault();
    search_input.style.display = "inline";
})


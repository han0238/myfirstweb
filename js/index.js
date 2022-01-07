function login(){

  let id = document.getElementById('id').value
  let password = document.getElementById('password').value
  
  let aaaa = JSON.parse(localStorage.getItem(id));

  if(aaaa.password === password){
    sessionStorage.setItem('id', id);
    location.href = './page/board.html';
  } else {
    alert("로그인 실패");    
  }
}

function newid(){
  location.href = './page/newid.html';
  
}

function logout(){
  location.href = '../index.html';
  sessionStorage.removeItem('id');
}

function checkEmpty(content){
  if(content.trim().length==0){
    return false;
  }else{
    return true;
  }
}

function checkReg(reg,content){
  if(reg.test(content)){
    return true;
  }else{
    return false;
  }
}
function getId(){
  check = document.frm1

  if (check.id.value=="" 
      || check.password.value=="" 
      || check.Name.value==""
      || check.tel.value==""
      || check.birth.value==""
      || check.email.value==""
      || check.addr.value==""){
    if(check.id.value==""){
      alert('필수 아이디가 비어있습니다.')
      return id.focus();

    } 

    if(check.password.value=="" ){
      alert('필수 비밀번호가 비어있습니다.')
      return password.focus();

    }
      
    if(check.Name.value=="" ){
      alert('이름을 입력 해주세요.')
      return Name.focus();
    }  
    if(check.tel.value=="" ){
      alert('전화번호를 입력 해주세요.')
      return tel.focus();
    }  
    if(check.birth.value=="" ){
      alert('생년월일을 입력 해주세요.')
      return birth.focus();
    }  
    if(check.email.value=="" ){
      alert('E-Mail을 입력 해주세요.')
      return email.focus();
    } 
    if(check.addr.value=="" ){
      alert('주소를 입력 해주세요.')
      return addr.focus();
    } 
  } else {
    let id = document.getElementById('id').value
    let password = document.getElementById('password').value
    let Name = document.getElementById('Name').value
    let tel = document.getElementById('tel').value
    let photo = document.getElementById('photo').value
    let gender = document.getElementById('gender').value
    let birth = document.getElementById('birth').value
    let email = document.getElementById('email').value
    let addr = document.getElementById('addr').value
    
    let member = {
      id:id,
      password:password,
      Name:Name,
      tel:tel,
      photo:photo,
      gender:gender,
      birth:birth,
      email:email,
      addr:addr
    }
    let data = JSON.stringify(member);
    localStorage.setItem(id,data);
  }
    let RegExp = /^[a-zA-Z0-9]{8,16}$/; 
    let RegExp_p = /^[a-zA-Z0-9]{4,16}$/; 
  
  if(!RegExp.test(check.id.value)){
    alert("아이디는 8~16자의 영문 숫자로만 입력하여 주세요.");
    return id.focus();
  } if(!RegExp_p.test(check.password.value)){
    alert("비밀번호는 4~16자의 영문 숫자로만 입력하여 주세요.");
    return id.focus();
  }else{
    alert("회원가입완료");

  location.href = '../index.html';
  }
  
}

function findAddress() {
    new daum.Postcode({
        oncomplete: function(data) {
            let roadAddr = data.roadAddress; 
            let extraRoadAddr = ''; 

            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }

            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }

            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            document.getElementById('zipCode').value = data.zonecode;
            document.getElementById("addr").value = roadAddr;

        }
    }).open();
}




// onclick

function boardSet(){
  boardList.forEach(board => createTr(board));
  }
// 게시판 데모데이터

// let boardList = [{no : 0, title: "글제목", content:"글내용", createdAt: "2022-01-04", viewCount:0, writer:"아이디"}]
let boardList = Array(45)
                  .fill()
                  .map((_, i) => { 
                    return {  no:i+1,
                              title:`글제목_${i+1}`,
                              content:'글내용'+(i+1),
                              createdAt:'2021-01-04',
                              viewCount:0,
                              writer:'작성자' }});

//게시판 함수
function createTr(board){
  let tr = document.createElement('tr');
  let tdNo = document.createElement('td');
  let tdTtile = document.createElement('td');
  let tdCdate = document.createElement('td');
  let tdWriter = document.createElement('td');
  let tdVc = document.createElement('td');

    tdNo.innerText = board.no;
    tdTtile.innerText = board.title;
    tdCdate.innerText = board.createdAt;
    tdWriter.innerText = board.writer;
    tdVc.innerText = board.viewCount;

    tr.appendChild(tdNo);
    tr.appendChild(tdTtile);
    tr.appendChild(tdWriter);
    tr.appendChild(tdCdate);
    tr.appendChild(tdVc);

  let tbody = document.getElementById('tbody');

    tbody.appendChild(tr);
}
// 페이지 나누기

let pageNumber = 1;
let pageSize = 14;
let totalCount = boardList.length
let totalPageCount = Math.ceil(totalCount / pageSize)


function boardPage(){

  for(let idx = 0; idx < pageSize; idx++){
    board = boardList[(pageNumber-1)*10+idx];
    createTr(board);
  }
}

function boardPageMove(){
  console.log(totalPageCount);
  console.log(totalPageCount);
  for(let num = 1; num <= totalPageCount; num ++){
    //페이지 엘리먼스 생성
    let pageNumber = document.createElement('span');
    
    // 번호 삽입
    pageNumber.innerText(num);
  
    pageNumber.addEventListener('click',()=>{
      /* 게시글 리스트를 그려주는 함수 구현 */
    });
  
    // 페이지 번호를 감싸고 있는 태그선택
    let pageWrapper = document.getElementById('pageWrapper');
  
    // 페이지 세팅
    pageWrapper.appendChild(pageNumber);
  }
  // 페이지 버튼 1부터 ~ totalCount까지 [각 페이지 숫자별 페이지 이동 함수]
  // 각 페이지 숫자를 누르면 다른 개시글 목록 보이기
  // 1. tbody.innerText=''; = 리스트비우기
  // 2. pageNumber = 2; 반복문으로 처리
  // 3. boardPage 함수 호출 
}

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

// 게시판 데모데이터

// let boardList = [{no : 0, title: "글제목", content:"글내용", createdAt: "2022-01-04", viewCount:0, writer:"아이디"}]


let boardList = getBoardList();
//로컬스토리지 boardlist 

function getBoardList(){
  let tempBoardList = JSON.parse(localStorage.getItem("boardList"));

  if(tempBoardList!=null){
    return tempBoardList;
  }else{
    return [];
  }
}
/*
  1. 예제 데이터 생성로직을 삭제한다.Array(45).fill().어쩌구저쩌구 를 삭제한다.
  2. boardList 변수에 localStorage에서 "boardList"키값을 불러와 리스트를 초기화한다.( localStorage.getItem("boardList") )
  3. localStorage에 "boardList" 키가 없으면 boardList에 빈 배열을 세팅한다.
  4. 게시글 작성시 boardList.push 하고, localStorage의 "boardList" 값도 업데이트 한다.
  */

function createTr(board){

  if(!board){
    return;
  }
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
    
    tr.addEventListener('click',()=>{
      mainText(board.no)
    })
}
// 페이지 나누기

let pageNumber = 1;
let pageSize = 14;
let totalCount = boardList.length;
let totalPageCount = Math.ceil(totalCount / pageSize);


function boardPage(){
  boardList.sort((a,b) => b.no-a.no);
  for(let idx = 0; idx < pageSize; idx++){
    
      board = boardList[(pageNumber-1)*pageSize+idx];
      createTr(board);
    }
  }



function boardPageMove(){

  for(let num = 1; num <= totalPageCount; num ++){
    //페이지 엘리먼스 생성
    let pageMove = document.querySelector('#pageMove');
    let pageNumbers = document.createElement('span');
    
    // 번호 삽입
    pageNumbers.innerText = num;
    pageMove.appendChild(pageNumbers)


    pageNumbers.addEventListener('click',()=>{

      document.getElementById('tbody').innerText='';
      boardPage();
      
      /* 게시글 리스트를 그려주는 함수 구현 */
    });  
  }     
}

function firstCall(){
  boardPage()
  boardPageMove()
}

function boardCreat(){
  location.href = './boardcreat.html';
}
// 게시글 작성 함수
function newBoard(){
  let title = document.getElementById('title').value
  let mainText = document.getElementById('mainText').value
  let dt = new Date();
  var str = dt.getFullYear()+'년 '+(dt.getMonth()+1)+'월 '+dt.getDate()+'일';


  let board = {
    no:boardList.length+1,
    title:title,
    mainText:mainText,
    writer:sessionStorage.getItem("id"),
    createdAt:str,
    viewCount:0
  }


  boardList.push(board)
  // boardList.unshift(board)
  
  

  
  let data = JSON.stringify(boardList);
  localStorage.setItem("boardList",data);


  location.href = './board.html';
}

  // 페이지 버튼 1부터 ~ totalCount까지 [각 페이지 숫자별 페이지 이동 함수]
  // 각 페이지 숫자를 누르면 다른 개시글 목록 보이기
  // 1. tbody.innerText=''; = 리스트비우기
  // 2. pageNumber = 2; 반복문으로 처리
  // 3. boardPage 함수 호출 
function newIdCancel(){
  location.href = '../index.html';
}
function canCel(){
  location.href = './board.html';
}
  
function mainText(no){
  location.href = './viewMainText.html?no='+no;
}

// 글 상세페이지
function view(){
  // 상세보기화면 데이터 바인딩
  // 1. 주소에서 글번호만 빼오기
  // 2. boardList에서 글번호로 글찾기
  // 3. 글을 찾았으면 각 자리에 데이터 넣기

  let boardNo = location.search.replace(/[^0-9]/g,'')*1;

  let no = document.querySelector('#viewNumber');
  let title = document.querySelector('#viewTitle');
  let writer = document.querySelector('#writer');
  let text = document.querySelector('#view');  
  let date = document.querySelector('#date');
  let tmpboard = {}

  for (let i = 0; i < boardList.length; i++){
    if(boardNo === boardList[i].no){
      tmpboard=boardList[i];
      break;
    }
  }

  no.innerText=tmpboard.no;
  title.innerHTML=tmpboard.title;
  writer.innerText=tmpboard.writer;
  text.innerText=tmpboard.mainText;
  date.innerText=tmpboard.createdAt

  let noFilter = boardList.filter((boardList) => {
    return boardList.no === tmpboard.no;
  })

  let data = JSON.stringify(noFilter);
  localStorage.setItem(boardList,data);


}
// boardList.filter
//글 상세 페이지에서 삭제하기
//1. boardLIst에서 해당 글 번호 빼고 필터 (pop, shift, unshft, push 불가)
//2. filteredList[필터한데이터] => localstorege.setItem
//3. 버튼 클릭 후 삭제하시겠습니까 팝업
//4. 글 목록 페이지로 이동


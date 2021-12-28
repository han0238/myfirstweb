function login(){

  let id = document.getElementById('id').value
  let pw = document.getElementById('password').value

  
  if(id == "asd" && pw == "1234") {
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

}

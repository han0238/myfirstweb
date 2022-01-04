function login(){

  let id = document.getElementById('id').value
  let password = document.getElementById('password').value
  
  if(localStorage.getItem(id && password)){
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

function getId(){


  
  check = document.frm1

  if (check.id.value=="" || check.password.value=="" || check.Name.value==""|| check.tel.value==""|| check.birth.value==""|| check.email.value==""|| check.addr.value==""){
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


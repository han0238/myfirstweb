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

 
  let RegExp = /^[a-zA-Z0-9]{8,16}$/; 
  let RegExp_p = /^[a-zA-Z0-9]{4,16}$/; 
  

  check = document.frm1

  if (check.id.value=="" || check.password.value=="" || check.Name.value==""|| check.tel.value==""|| check.birth.value==""|| check.email.value==""|| check.addr.value==""){
    if(check.id.value==""){
      alert('필수 아이디가 비어있습니다.')
      return id.focus();

    } else if(!RegExp.test(check.id.value)){
      alert("아이디는 8~16자의 영문 숫자로만 입력하여 주세요.");
      return id.focus();
    }

    if(check.password.value=="" ){
      alert('필수 비밀번호가 비어있습니다.')
      return password.focus();

    } else if(!RegExp_p.test(check.password.value)){
      alert("비밀번호는 4~16자의 영문 숫자로만 입력하여 주세요.");
      return id.focus();
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
  alert("회원가입완료");

  location.href = '../index.html';
}

      

function findAddress() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let roadAddr = data.roadAddress; // 도로명 주소 변수
            let extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('zipCode').value = data.zonecode;
            document.getElementById("addr").value = roadAddr;

        }
    }).open();
}


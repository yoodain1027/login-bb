function register() {
    const email = document.getElementById("signup-email").value.toLowerCase(); // 이메일 소문자 변환
    const password = document.getElementById("signup-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
        document.getElementById("message").innerText = " 이미 가입된 이메일입니다.";
    } else {
        users[email] = password; 
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("message").innerText = " 회원가입 성공!";
        showPage("login"); // 회원가입 후 로그인 화면으로 이동
    }
}

function login() {
    const email = document.getElementById("login-email").value.toLowerCase(); // 이메일 소문자 변환
    const password = document.getElementById("login-password").value;
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[email]) {
        document.getElementById("message").innerText = " 회원가입되지 않은 이메일입니다.";
    } else if (users[email] === password) {
        document.getElementById("message").innerText = " 로그인 성공! 환영합니다.";
        localStorage.setItem("loggedInUser", email); // 로그인 상태 저장
        showPage("home"); // 로그인 후 홈 화면으로 이동
    } else {
        document.getElementById("message").innerText = " 비밀번호가 틀렸습니다.";
    }
}

function showPage(pageId) {
    console.log(`Navigating to: ${pageId}`);
    document.getElementById("home").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "none";
    document.getElementById(pageId).style.display = "block";
}

// 페이지가 로드될 때 자동 로그인 확인
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("loggedInUser")) {
        showPage("home"); // 자동 로그인
    }
});

// 로그아웃 기능 추가
function logout() {
    localStorage.removeItem("loggedInUser"); // 로그인 정보 삭제
    showPage("home"); // 홈 화면으로 이동
}

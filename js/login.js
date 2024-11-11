document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // 로그인 폼 제출 시 이벤트 핸들러
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        // 비밀번호 해시화
        const hashedPassword = sha256(password);

        // 사용자 정보 확인
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((user) => user.username === username && user.password === hashedPassword);

        if (user) {
            localStorage.setItem("loggedInUser", username);
            alert("로그인 성공!");
            window.location.href = "index.html";
        } else {
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    });
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
        alert("로그인 성공!");
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
    } else {
        alert("사용자 이름 또는 비밀번호가 잘못되었습니다.");
    }
});

// Google 로그인
function signUpWithGoogle() {
    alert("Google 로그인 기능은 준비 중입니다.");
}

// Kakao 로그인
function handleKakaoLogin() {
    alert("Kakao 로그인 기능은 준비 중입니다.");
}

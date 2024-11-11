document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("registerUsername").value.trim();
        const password = document.getElementById("registerPassword").value.trim();

        if (!username || !password) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        // 비밀번호를 해시화하여 저장
        const hashedPassword = sha256(password);

        // 기존 사용자 목록 가져오기
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // 중복 사용자 확인
        const userExists = users.some((user) => user.username === username);
        if (userExists) {
            alert("이미 존재하는 사용자입니다.");
            return;
        }

        // 사용자 저장
        users.push({ username, password: hashedPassword });
        localStorage.setItem("users", JSON.stringify(users));

        alert("회원가입이 완료되었습니다.");
        window.location.href = "login.html";
    });
});

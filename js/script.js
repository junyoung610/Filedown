// 페이지 로드 시 실행될 함수
window.onload = function () {
    checkLoginStatus();
    loadPosts(); // 게시글 목록 로드

    // 글쓰기 버튼 클릭 시 이벤트
    const writeBtn = document.getElementById("writeBtn");
    writeBtn.addEventListener("click", function () {
        // 글쓰기 페이지로 이동
        if (localStorage.getItem("loggedInUser")) {
            window.location.href = "write.html"; // 글쓰기 페이지로 이동
        } else {
            alert("로그인이 필요합니다.");
            window.location.href = "login.html"; // 로그인 페이지로 이동
        }
    });
};

// 게시글 로드
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const boardList = document.getElementById("boardList");

    // 테이블 초기화
    boardList.innerHTML = `
        <tr><th>번호</th><th>제목</th><th>작성자</th><th>작성일</th><th>조회수</th></tr>
    `;

    posts.forEach((post, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><a href="post.html" class="post-link" data-index="${index}">${post.title}</a></td>
            <td>${post.author}</td>
            <td>${post.date}</td>
            <td>${post.views || 0}</td>
        `;
        boardList.appendChild(row);
    });

    // 게시글 클릭 시 인덱스를 세션 스토리지에 저장
    const postLinks = document.querySelectorAll(".post-link");
    postLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const postIndex = event.target.getAttribute("data-index");
            const posts = JSON.parse(localStorage.getItem("posts"));
            const selectedPost = posts[postIndex]; // 클릭한 게시글 정보

            // sessionStorage에 선택된 게시글 정보 저장
            sessionStorage.setItem("selectedPost", JSON.stringify(selectedPost));

            // 상세보기 페이지로 이동
            window.location.href = "post.html";
        });
    });
}

// 로그인 상태 확인 및 버튼 변경
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const authBtn = document.getElementById("authBtn");

    if (loggedInUser) {
        welcomeMessage.textContent = `환영합니다, ${loggedInUser}님!`;
        authBtn.textContent = "로그아웃";
        authBtn.onclick = logout;
    } else {
        welcomeMessage.textContent = "";
        authBtn.textContent = "로그인";
        authBtn.onclick = () => (window.location.href = "login.html");
    }
}

// 로그아웃 처리
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("로그아웃 되었습니다.");
    window.location.reload();
}

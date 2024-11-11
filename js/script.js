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

// 페이지 로드 시 초기화
window.onload = () => {
    checkLoginStatus();
    loadPosts(); // 게시글 목록 로드
};

// 로그인 상태 확인 및 버튼 변경
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem("loggedInUser");
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

function logout() {
    localStorage.removeItem("loggedInUser");
    alert("로그아웃 되었습니다.");
    window.location.reload();
}

// 게시글 상세 보기
document.addEventListener("DOMContentLoaded", () => {
    const selectedPost = JSON.parse(sessionStorage.getItem("selectedPost"));

    // 게시글 정보 출력
    postTitle.textContent = selectedPost.title;
    postAuthor.textContent = `작성자: ${selectedPost.author}`;
    postDate.textContent = `작성일: ${selectedPost.date}`;
    postContent.textContent = selectedPost.content;

    // 조회수 증가
    const posts = JSON.parse(localStorage.getItem("posts"));
    const postIndex = posts.findIndex((post) => post.title === selectedPost.title);
    posts[postIndex].views++;
    localStorage.setItem("posts", JSON.stringify(posts));
});

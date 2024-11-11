document.addEventListener("DOMContentLoaded", () => {
    // 로그인된 사용자 확인
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
        return;
    }

    // 작성자 필드에 로그인된 사용자 이름 자동 설정
    const authorField = document.getElementById("author");
    if (authorField) {
        authorField.value = loggedInUser;
    }

    // 글 작성 폼 제출 이벤트 리스너 설정
    const writeForm = document.getElementById("writeForm");
    if (writeForm) {
        writeForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const title = document.getElementById("title").value;
            const author = document.getElementById("author").value;
            const content = document.getElementById("content").value;
            const fileInput = document.getElementById("file");

            let fileData = null;
            if (fileInput && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                fileData = {
                    name: file.name,
                    url: URL.createObjectURL(file), // 파일 URL 생성
                };
            }

            // 새로운 게시글 생성
            const newPost = {
                title,
                author,
                content,
                date: new Date().toLocaleString(),
                views: 0,
                file: fileData,
            };

            // 로컬 스토리지에 게시글 저장
            const posts = JSON.parse(localStorage.getItem("posts")) || [];
            posts.push(newPost);
            localStorage.setItem("posts", JSON.stringify(posts));

            alert("글이 등록되었습니다.");
            window.location.href = "index.html";
        });
    }
});

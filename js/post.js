document.addEventListener("DOMContentLoaded", () => {
    const selectedPost = JSON.parse(sessionStorage.getItem("selectedPost"));

    if (!selectedPost) {
        alert("잘못된 접근입니다.");
        window.location.href = "index.html"; // 인덱스 페이지로 이동
        return; // 이후 코드 실행 방지
    }

    // 게시글 정보 출력
    const postTitle = document.getElementById("postTitle");
    const postAuthor = document.getElementById("postAuthor");
    const postDate = document.getElementById("postDate");
    const postContent = document.getElementById("postContent");

    postTitle.textContent = selectedPost.title;
    postAuthor.textContent = `작성자: ${selectedPost.author}`;
    postDate.textContent = `작성일: ${selectedPost.date}`;
    postContent.textContent = selectedPost.content;

    // 조회수 증가
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const postIndex = posts.findIndex((post) => post.title === selectedPost.title);

    if (postIndex !== -1) {
        posts[postIndex].views = (posts[postIndex].views || 0) + 1; // 조회수 증가
        localStorage.setItem("posts", JSON.stringify(posts)); // 수정된 게시글 배열 저장
    }

    // 조회수 화면 업데이트 (optional)
    const postViews = document.getElementById("postViews");
    if (postViews) {
        postViews.textContent = `조회수: ${posts[postIndex].views}`;
    }

    // 첨부파일이 있는 경우
    if (selectedPost.file) {
        const downloadLink = document.getElementById("downloadLink");

        // Blob URL을 직접 사용하여 다운로드 링크 설정
        const fileUrl = selectedPost.file.url; // Blob URL (이미 만들어져 있음)
        downloadLink.href = fileUrl;
        downloadLink.textContent = `첨부 파일 다운로드: ${selectedPost.file.name}`;
        downloadLink.style.display = "block";

        // 파일 다운로드 처리 (클릭 시 실제 파일 다운로드)
        downloadLink.addEventListener("click", (event) => {
            event.preventDefault(); // 기본 동작을 막음
            const fileData = selectedPost.file;

            if (fileData) {
                // Blob을 사용하여 파일 다운로드 처리
                const fileBlob = new Blob([fileData], { type: "application/octet-stream" });
                const blobUrl = URL.createObjectURL(fileBlob);

                // 다운로드 링크 생성
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = fileData.name; // 다운로드할 파일명 지정
                a.click(); // 다운로드 시작

                // 다운로드 후 메모리에서 Blob URL 해제
                URL.revokeObjectURL(blobUrl);
            } else {
                alert("파일을 찾을 수 없습니다.");
            }
        });
    }
});

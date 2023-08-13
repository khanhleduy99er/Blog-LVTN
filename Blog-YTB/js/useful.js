// function like post
document.addEventListener('DOMContentLoaded', function() {
    const pageName = window.location.pathname; // Lấy đường dẫn của trang hiện tại
    const likeStorageKey = `likeCount_${pageName}`;

    let likeCount = parseInt(localStorage.getItem(likeStorageKey)) || 0;
    updateLikeCount();

    document.getElementById("like-button").addEventListener('click', function() {
        likeCount++;
        updateLikeCount();
        localStorage.setItem(likeStorageKey, likeCount);
    });

    function updateLikeCount() {
        document.getElementById("like-count").textContent = likeCount;
    }

    updateLikeCount();
});
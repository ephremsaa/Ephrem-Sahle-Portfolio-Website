const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const likeBtn = document.getElementById("likeBtn");
const likeCount = document.getElementById("likeCount");


if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
});


menuToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});


if (likeBtn && likeCount) {
    let likes = localStorage.getItem("likes") || 0;
    likeCount.textContent = likes;

    likeBtn.addEventListener("click", () => {
        likes++;
        localStorage.setItem("likes", likes);
        likeCount.textContent = likes;
    });
}

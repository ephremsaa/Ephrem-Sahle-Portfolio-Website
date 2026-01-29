const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        message.textContent = "Message sent successfully!";
        message.style.color = "green";
        form.reset();
    });
}

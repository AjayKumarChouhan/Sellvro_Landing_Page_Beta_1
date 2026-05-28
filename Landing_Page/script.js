document.addEventListener("DOMContentLoaded", function() {
    
    // Video Grid Filter Logic
    const tabButtons = document.querySelectorAll(".tab-btn");
    const videoCards = document.querySelectorAll(".video-card");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active status from previous buttons
            tabButtons.forEach(btn => btn.classList.remove("active"));
            // Add active status to current clicked button
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            videoCards.forEach(card => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.style.display = "block";
                    // Add entry animation styling smoothly
                    card.style.opacity = "0";
                    setTimeout(() => { card.style.opacity = "1"; }, 50);
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // Mock Interaction for Video Play Overlay
    const playButton = document.querySelector(".play-btn-center");
    if(playButton) {
        playButton.addEventListener("click", function() {
            alert("Video modal overlay interaction placeholder. Connect your Vimeo/YouTube player embed APIs here.");
        });
    }
});
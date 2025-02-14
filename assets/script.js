// Function to extract the name from the URL query parameters
function getNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "My Love"; // Default to "My Love" if no name is provided
    return decodeURIComponent(name);
}

// Ensure script runs after DOM loads
document.addEventListener("DOMContentLoaded", function () {
    // Update the title dynamically
    const title = document.querySelector(".title");
    title.textContent = `I love you ${getNameFromURL()}`;

    // Select elements after DOM is ready
    const text = document.querySelector(".text");
    const cat = document.querySelector(".cat");
    const buttons = document.querySelectorAll(".button");
    const errorButton = document.querySelector(".button__error");

    const alternatives = [
        { text: "", images: "./assets/images/1.gif" },
        { text: "I promise, it will be unforgettable.", images: "./assets/images/2.gif" },
        { text: "Think again...", images: "./assets/images/3.gif" },
        { text: "Come on now, say yes!", images: "./assets/images/4.gif" },
    ];

    const ohyes = { text: "I knew you would accept!", images: "./assets/images/yes.gif" };
    let count = 0;

    function updateDisplay(item) {
        cat.src = item.images;
        text.innerHTML = item.text;
    }

    // Initialize first display
    updateDisplay(alternatives[0]);

    // Error Button Reset Logic
    errorButton.addEventListener("click", () => {
        count = 0;
        updateDisplay(alternatives[count]);
        buttons.forEach((btn) => btn.style.display = "inline-block");
        errorButton.style.display = "none";
    });

    // Button Click Events
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.dataset.action === "yes") {
                updateDisplay(ohyes);
                buttons.forEach((btn) => (btn.style.display = "none"));
            } else if (button.dataset.action === "no") {
                count++;
                if (count < alternatives.length) {
                    updateDisplay(alternatives[count]);
                } else {
                    buttons.forEach((btn) => (btn.style.display = "none"));
                    errorButton.style.display = "inline-block";
                }
            }
        });
    });
});

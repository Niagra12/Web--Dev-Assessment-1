// Function to calculate total cost when the button is clicked
function calculateTotal() {
    // Get input values and convert them to numbers
    let pricePerLiter = parseFloat(document.getElementById("petrol-price").value);
    let liters = parseFloat(document.getElementById("liters").value);
    // Check if the input is valid (not empty or invalid numbers)
    if (isNaN(pricePerLiter) || isNaN(liters)) {
        document.getElementById("total-cost").textContent = "Please enter valid numbers.";
        return; // Stop the function if input is invalid
    }
    // Calculate the total cost
    let totalCost = pricePerLiter * liters;

    // Display the total cost
    document.getElementById("total-cost").textContent = `Total Cost: $${totalCost.toFixed(2)}`;
}
// Attach an event listener to the "Calculate" button
document.getElementById("calculate").addEventListener("click", calculateTotal);
// Update total cost automatically when user types in the input fields
document.getElementById("petrol-price").oninput = calculateTotal;
document.getElementById("liters").oninput = calculateTotal;
// Get HTML elements
const rgbValue = document.getElementById("rgb-value"); // Where the correct RGB color is displayed
const options = document.getElementById("options"); // The container for color options
const message = document.getElementById("message"); // Message for correct/incorrect guesses
const restartButton = document.getElementById("restart"); // Restart button
let correctColor; // Variable to store the correct color
// Function to generate a random RGB color
function generateRandomColor() {
    let r = Math.floor(Math.random() * 256); // Generate a number between 0 and 255 for red
    let g = Math.floor(Math.random() * 256); // Generate a number between 0 and 255 for green
    let b = Math.floor(Math.random() * 256); // Generate a number between 0 and 255 for blue
    return `rgb(${r},${g},${b})`; // Return the RGB color as a string
}
// Function to start or restart the game
function startGame() {
    options.innerHTML = ""; // Clear previous color choices
    message.textContent = ""; // Clear any previous messages
    // Pick a new correct color
    correctColor = generateRandomColor();
    rgbValue.textContent = correctColor.toUpperCase(); // Display the correct RGB color in uppercase
    let correctIndex = Math.floor(Math.random() * 3); // Randomly choose where the correct color will appear
    // Generate 3 color choices
    for (let i = 0; i < 3; i++) {
        let colorOption = document.createElement("div"); // Create a div for each color option
        colorOption.classList.add("color-option"); // Add CSS class for styling
        // Assign the correct color to one of the options, the rest get random colors
        let color = (i === correctIndex) ? correctColor : generateRandomColor();
        colorOption.style.background = color; // Set the background color
        // Event listener for when a user clicks on a color
        colorOption.onclick = function() {
            if (color === correctColor) {
                message.textContent = "Correct!";
                message.style.color = "green";
            } else {
                message.textContent = "Incorrect! Try Again.";
                message.style.color = "red";
            }
            // Restart the game after 1 second
            setTimeout(startGame, 1000);
        };
        options.appendChild(colorOption); // Add the color option to the page
    }
}
// Restart the game when the button is clicked
restartButton.onclick = startGame;
// Start the game for the first time
startGame();

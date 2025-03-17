// Cat objects - demonstrating the use of objects
const catDatabase = {
    cats: [
        // Initialize with empty array that we'll populate
    ],
    // Initialize the cat database with local images
    init: function() {
        // We have images from 1.jpg to 37.jpg in the img folder
        for (let i = 1; i <= 37; i++) {
            this.cats.push({
                id: i,
                url: `img/${i}.jpg`,
                type: "Cat " + i
            });
        }
    },
    getRandomCat: function() {
        const randomIndex = Math.floor(Math.random() * this.cats.length);
        return this.cats[randomIndex];
    }
};

// Loading messages
const loadingMessages = [
    "Looking for the perfect Scrotum",
    "Searching for the best Scrotum",
    "Hunting for an amazing Scrotum",
    "Scanning the Scrotum database",
    "Meow meow meow...",
];

// DOM Elements
const homepage = document.getElementById('homepage');
const loadingpage = document.getElementById('loadingpage');
const resultpage = document.getElementById('resultpage');
const generateButton = document.getElementById('generate-button');
const restartButton = document.getElementById('restart-button');
const progressBar = document.getElementById('progress-bar');
const loadingText = document.getElementById('loading-text');
const catImage = document.getElementById('cat-image');
const imageShuffle = document.getElementById('image-shuffle');
const confettiContainer = document.getElementById('confetti');

// Initial state
let currentMessageIndex = 0;
let messageInterval;
let shuffleInterval;

// Initialize the cat database with our local images
catDatabase.init();

// Event Listeners
generateButton.addEventListener('click', startCatSearch);
restartButton.addEventListener('click', restart);

// Start the cat search process
function startCatSearch() {
    // Hide homepage, show loading page
    homepage.classList.add('hidden');
    loadingpage.classList.remove('hidden');
    
    // Start the loading animation
    startLoadingAnimation();
    
    // Start the image shuffle animation
    startImageShuffle();
    
    // Simulate loading time (3 seconds)
    setTimeout(() => {
        showResult();
    }, 3000);
}

// Loading animation
function startLoadingAnimation() {
    // Animate progress bar
    progressBar.style.width = '100%';
    
    // Change loading messages
    updateLoadingMessage();
    messageInterval = setInterval(updateLoadingMessage, 1200);
}

// Update the loading message
function updateLoadingMessage() {
    currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
    loadingText.textContent = loadingMessages[currentMessageIndex];
}

// Image shuffle animation
function startImageShuffle() {
    // Clear any existing shuffle interval to avoid multiple intervals running
    if (shuffleInterval) {
        clearInterval(shuffleInterval);
    }
    
    shuffleInterval = setInterval(() => {
        // Show a different cat image in each shuffle frame
        const randomCatIndex = Math.floor(Math.random() * catDatabase.cats.length);
        const randomCatUrl = catDatabase.cats[randomCatIndex].url;
        
        // Set the background image
        imageShuffle.style.backgroundImage = `url(${randomCatUrl})`;
    }, 150);
    
    // We'll clear this interval in the showResult function, so it continues
    // shuffling throughout the entire loading process
}
// Show the result page with the random cat
function showResult() {
    // Clear the intervals
    clearInterval(messageInterval);
    clearInterval(shuffleInterval);
    
    // Get a random cat from our database
    const randomCat = catDatabase.getRandomCat();
    
    // Set the image source
    catImage.src = randomCat.url;
    
    // Hide loading page, show result page
    loadingpage.classList.add('hidden');
    resultpage.classList.remove('hidden');
    
    // Create confetti effect
    createConfetti();
}

// Create confetti animation
function createConfetti() {
    // Clear any existing confetti
    confettiContainer.innerHTML = '';
    
    // Create 50 confetti pieces
    const colors = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random position
        confetti.style.left = Math.random() * 100 + '%';
        
        // Random delay
        confetti.style.animationDelay = Math.random() * 3 + 's';
        
        // Random color
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = randomColor;
        
        // Random size
        const size = Math.floor(Math.random() * 10) + 5;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // Random rotation
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Add to container
        confettiContainer.appendChild(confetti);
    }
}

// Restart the process
function restart() {
    // Reset state
    progressBar.style.width = '0%';
    
    // Hide result page, show loading page directly
    resultpage.classList.add('hidden');
    loadingpage.classList.remove('hidden');
    
    // Start the loading process again
    startLoadingAnimation();
    startImageShuffle();
    
    // Simulate loading time (12 seconds)
    setTimeout(() => {
        showResult();
    }, 8000);
}
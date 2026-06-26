 // Reasons database
 const reasons = [
    { 
        text: "Happy Birthday katrina, More blessings to come - Sota 💖", 
        emoji: "🌟",
        gif: "gif1.gif"
    },
    { 
        text: "Happy birthday motherfucker! But in all seriousness glad to have you as a friend! So to our big dicked crazy friend, we love you and make sure you live long enough so we can keep making stupid memories together! At kung may mang-aaawway sayo tara bugbog natin yan! - Grim 🌸 ", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "Happy birthday Kat! Kamusta maging 23 or 22? I forgot honestly sorry HAHAHAH anyway thanks for always being a good friend and always be you fam dont change, hope you enjoy your birthday 🎉 🥳 🎂 ✨ - Vincent ", 
        emoji: "💕",
        gif: "gif1.gif"
    },
    { 
        text: "Henlooo Katrina my twin burikat🫂, Happiest birthday to you and to your family, always remember to lab your parents cuz they are the one who pregnancy you! Always promote peace and order and take good care of yourself for we are to do kaykay sessions. HAHAHAHAHAHA I LOVE YOU MY FAV CHECHAAAAY😉 - Nabi Gwapa ", 
        emoji: "🌟",
        gif: "gif2.gif"
    },
    { 
        text: "Hey my Katrina, crazy how we went from complete strangers to now being people that are sisters. Happy birthday bcs i look forward to more of em with you and for you ❤️ dont feel too alone, youre not, and dont feel like youre weird, its unique. Love you always Kat mwah mwah - Nachiii", 
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Msgs ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Wait, there's more - nard 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // Replace with the actual URL of the next page
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);
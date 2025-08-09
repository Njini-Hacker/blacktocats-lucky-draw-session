document.addEventListener('DOMContentLoaded', () => {
    const raffleButton = document.getElementById('raffle-button');
    const resultContainer = document.getElementById('result-container');

    raffleButton.addEventListener('click', async () => {
        const commenters = await fetchCommenters();
        const winner = selectWinner(commenters);
        displayWinner(winner);
    });

    async function fetchCommenters() {
        const response = await fetch('/api/commenters');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    }

    function selectWinner(commenters) {
        const randomIndex = Math.floor(Math.random() * commenters.length);
        return commenters[randomIndex];
    }

    function displayWinner(winner) {
        resultContainer.innerHTML = `<h2>Congratulations, ${winner}!</h2>`;
        animateWinnerAnnouncement();
    }

    function animateWinnerAnnouncement() {
        resultContainer.classList.add('animate');
        setTimeout(() => {
            resultContainer.classList.remove('animate');
        }, 3000);
    }

    function launchConfetti() {
        // Simple confetti using canvas-confetti CDN
        if (window.confetti) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    window.onload = function() {
        if (document.getElementById('winner-section')) {
            // Load confetti script if not already loaded
            if (!window.confetti) {
                var script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
                script.onload = launchConfetti;
                document.body.appendChild(script);
            } else {
                launchConfetti();
            }
        }
    };
});
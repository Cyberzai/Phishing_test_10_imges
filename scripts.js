const emails = [
    { src: 'email1.png', isPhishing: true },
    { src: 'email2.png', isPhishing: true },
    { src: 'email3.png', isPhishing: true },
    { src: 'email4.png', isPhishing: true },
    { src: 'email5.png', isPhishing: true },
    { src: 'email6.png', isPhishing: false },
    { src: 'email7.png', isPhishing: true },
    { src: 'email8.png', isPhishing: false },
    { src: 'email9.png', isPhishing: true },
    { src: 'email10.png', isPhishing: true },
];

let currentEmailIndex = 0;
let score = 0;
let level = 1;
let timer;
let timeLeft = 5;

function startGame() {
    document.getElementById('intro-screen').classList.remove('visible');
    document.getElementById('game-screen').classList.add('visible');
    displayEmail();
}

function displayEmail() {
    document.getElementById('email-content').src = emails[currentEmailIndex].src;
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('next-button').classList.add('hidden');
    timeLeft = 5;
    document.getElementById('timer').textContent = timeLeft;
    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame('Time Up! Game Over.');
        }
    }, 1000);
}

function checkEmail(isLegitimate) {
    const email = emails[currentEmailIndex];
    const feedback = document.getElementById('feedback');
    clearInterval(timer);
    if ((isLegitimate && !email.isPhishing) || (!isLegitimate && email.isPhishing)) {
        feedback.textContent = 'Correct!';
        feedback.classList.remove('hidden');
        document.getElementById('next-button').classList.remove('hidden');
        score++;
    } else {
        feedback.textContent = 'Incorrect! Game Over.';
        feedback.classList.remove('hidden');
        endGame('Incorrect! Game Over.');
    }
}

function nextEmail() {
    currentEmailIndex++;
    feedback.textContent = '';
    document.getElementById('feedback').classList.add('hidden'); // Hide feedback when moving to the next email
    if (currentEmailIndex >= emails.length) {
        endGame('Congratulations! You solved all the levels correctly! flag{We_catched_8_fishes!!}');
    } else {
        if (currentEmailIndex % 2 === 0) {  // Increase level after every 2 emails
            level++;
            feedback.textContent = '';
            document.getElementById('level').textContent = level;
        }
        displayEmail();
    }
}

function endGame(message) {
    alert(message);
    document.getElementById('game-screen').classList.remove('visible');
    document.getElementById('end-screen').classList.add('visible');
    document.getElementById('final-score').textContent = score;
}

function restartGame() {
    currentEmailIndex = 0;
    score = 0;
    level = 1;
    document.getElementById('level').textContent = level;
    document.getElementById('end-screen').classList.remove('visible');
    document.getElementById('intro-screen').classList.add('visible');
    clearInterval(timer);
}

let score = 0;
let currentQuestionIndex = 0;
let timer; // Speichert den Timer
let timeLeft = 10; // Sekunden pro Frage
let jokerUsed = false; // Variable für den Joker-Status

function shuffleQuestions(array) {
    return array.sort(() => Math.random() - 0.5);
}

let questions = shuffleQuestions([
    {
        question: "Wie heißt das heilige Buch des Islam?",
        answers: ["Bibel", "Thora", "Koran", "Veden"],
        correctAnswer: 2
    },
    {
        question: "Wer gilt im Islam als letzter Prophet?",
        answers: ["Moses", "Abraham", "Jesus", "Mohammed"],
        correctAnswer: 3
    },
    {
        question: "Wie viele Säulen hat der Islam?",
        answers: ["3", "5", "7", "10"],
        correctAnswer: 1
    },
    {
        question: "In welche Richtung beten Muslime?",
        answers: ["Nach Westen", "Nach Süden", "Nach Norden", "Nach Mekka"],
        correctAnswer: 3
    },
    {
        question: "Welcher Feiertag markiert das Ende des Fastenmonats Ramadan?",
        answers: ["Eid al-Fitr", "Eid al-Adha", "Mawlid al-Nabi", "Aschura"],
        correctAnswer: 0
    },
    {
        question: "Wie nennt man das Fasten im Monat Ramadan?",
        answers: ["Salah", "Zakat", "Sawm", "Hajj"],
        correctAnswer: 2
    },
    {
        question: "Wie viele Gebete (Salah) verrichten Muslime täglich?",
        answers: ["3", "7", "5", "10"],
        correctAnswer: 2
    },
    {
        question: "Was bedeutet „Islam“?",
        answers: ["Weisheit", "Frieden und Hingabe", "Gesetz", "Gemeinschaft"],
        correctAnswer: 1
    },
    {
        question: "Wie nennt man die Pilgerfahrt nach Mekka?",
        answers: ["Hajj", "Umrah", "Salah", "Sawm"],
        correctAnswer: 0
    },
    {
        question: "Was ist die Kaaba?",
        answers: ["Eine Moschee in Medina", "Ein islamisches Gesetzbuch", "Ein Gebetstuch", "Ein schwarzer Würfel in Mekka"],
        correctAnswer: 3
    }
]);

function displayQuestion() {
    clearInterval(timer);
    timeLeft = 10;

    if (currentQuestionIndex >= questions.length) {
        document.getElementById('quiz-container').hidden = true;
        document.getElementById('result').hidden = false;
        document.getElementById('score').textContent = score;
        return;
    }

    let question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;

    let answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    question.answers.forEach((answer, index) => {
        let answerButton = document.createElement('button');
        answerButton.classList.add("btn", "btn-dark", "me-2");
        answerButton.textContent = answer;
        answerButton.onclick = () => checkAnswer(index);
        answersDiv.appendChild(answerButton);
    });

    // Joker Button aktivieren
    if (!jokerUsed) {
        document.getElementById("joker-button").disabled = false;
    }

    document.getElementById('timer').textContent = `Zeit: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft -= 1;
        document.getElementById('timer').textContent = `Zeit: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showFeedback(false, true); // Zeit abgelaufen, keine Antwort
        }
    }, 1000);
}

function checkAnswer(userAnswer) {
    clearInterval(timer);
    let correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (userAnswer === correctAnswer) {
        score += 1;
        showFeedback(true);
    } else {
        showFeedback(false);
    }
}

function showFeedback(isCorrect, isTimeout = false) {
    let feedbackElement = document.getElementById("feedback");
    let feedbackMessage = document.getElementById("feedback-message");

    if (isTimeout) {
        feedbackMessage.textContent = "Zeit abgelaufen!";
        feedbackElement.classList.remove("bg-success", "bg-danger");
        feedbackElement.classList.add("bg-warning");
    } else if (isCorrect) {
        feedbackMessage.textContent = "Richtig!";
        feedbackElement.classList.remove("bg-danger", "bg-warning");
        feedbackElement.classList.add("bg-success");
    } else {
        feedbackMessage.textContent = "Falsch!";
        feedbackElement.classList.remove("bg-success", "bg-warning");
        feedbackElement.classList.add("bg-danger");
    }

    feedbackElement.style.display = "block";

    setTimeout(() => {
        feedbackElement.style.display = "none";
        nextQuestion();
    }, 2000);
}

function nextQuestion() {
    currentQuestionIndex += 1;
    displayQuestion();
}

// Joker verwenden
function useJoker() {
    if (jokerUsed) return; // Joker wurde bereits verwendet, nichts tun

    jokerUsed = true;
    document.getElementById("joker-button").disabled = true; // Joker-Button deaktivieren

    let question = questions[currentQuestionIndex];
    let correctAnswerIndex = question.correctAnswer;
    let incorrectAnswers = question.answers
        .map((answer, index) => index)
        .filter(index => index !== correctAnswerIndex);

    // Entferne zwei zufällige falsche Antworten
    let randomIncorrectIndexes = [];
    while (randomIncorrectIndexes.length < 2) {
        let randomIndex = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
        if (!randomIncorrectIndexes.includes(randomIndex)) {
            randomIncorrectIndexes.push(randomIndex);
        }
    }

    randomIncorrectIndexes.forEach(index => {
        document.querySelectorAll('#answers button')[index].style.display = 'none';
    });
}

// Speichern des Highscores
function submitScore() {
    let username = document.getElementById('username').value;
    if (username.trim() === '') {
        alert("Bitte gib deinen Namen ein!");
        return;
    }

    let highscoreList = JSON.parse(localStorage.getItem('highscores')) || [];
    highscoreList.push({ name: username, score: score });

    // Sortiere nach Punktzahl, absteigend
    highscoreList.sort((a, b) => b.score - a.score);

    // Speichern in localStorage
    localStorage.setItem('highscores', JSON.stringify(highscoreList));

    // Anzeigen der Highscore-Tabelle
    displayHighscores();
}

// Highscore-Tabelle anzeigen
function displayHighscores() {
    document.getElementById('result').hidden = true;
    let highscoreTable = document.getElementById('highscore-table');
    highscoreTable.hidden = false;

    let highscoreList = JSON.parse(localStorage.getItem('highscores')) || [];
    let highscoreListElement = document.getElementById('highscore-list');
    highscoreListElement.innerHTML = '';

    highscoreList.forEach((entry, index) => {
        let row = document.createElement('tr');
        row.innerHTML = `<td>${entry.name}</td><td>${entry.score}</td>`;
        highscoreListElement.appendChild(row);
    });
}

// Initialisiere das Quiz
displayQuestion();



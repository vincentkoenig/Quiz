let score = 0;
let currentQuestionIndex = 0;
let timer;
let timeLeft = 10;
let jokerUsed = false;

function shuffleQuestions(array) {
    return array.sort(() => Math.random() - 0.5);
}

const MAX_QUESTIONS = 5; // maximale Anzahl der Fragen pro Quiz

let questions = shuffleQuestions([
{question: "Welches ist das größte Land der Welt (Fläche)?", answers: ["China","USA","Russland","Kanada"], correctAnswer: 2},
{question: "Wer malte die Mona Lisa?", answers: ["Vincent van Gogh","Leonardo da Vinci","Pablo Picasso","Claude Monet"], correctAnswer: 1},
{question: "Wie viele Planeten hat unser Sonnensystem?", answers: ["7","8","9","10"], correctAnswer: 1},
{question: "Welches Element hat das chemische Symbol 'O'?", answers: ["Gold","Osmium","Ozon","Sauerstoff"], correctAnswer: 3},
{question: "Wie heißt die Hauptstadt von Australien?", answers: ["Sydney","Melbourne","Canberra","Perth"], correctAnswer: 2},
{question: "Welcher Planet ist der Sonne am nächsten?", answers: ["Venus","Merkur","Mars","Jupiter"], correctAnswer: 1},
{question: "Wie viele Kontinente gibt es auf der Erde?", answers: ["5","6","7","8"], correctAnswer: 2},
{question: "Wer schrieb 'Faust'?", answers: ["Schiller","Goethe","Lessing","Kafka"], correctAnswer: 1},
{question: "Wie heißt das größte Säugetier der Welt?", answers: ["Elefant","Blauwal","Nashorn","Giraffe"], correctAnswer: 1},
{question: "Welcher Sportler hält den Rekord für die meisten gewonnenen Olympischen Goldmedaillen?", answers: ["Usain Bolt","Michael Phelps","Simone Biles","Carl Lewis"], correctAnswer: 1},
{question: "Welche Sprache hat die meisten Muttersprachler weltweit?", answers: ["Englisch","Spanisch","Mandarin","Hindi"], correctAnswer: 2},
{question: "Welches ist das chemische Symbol für Gold?", answers: ["Au","Ag","Gd","Go"], correctAnswer: 0},
{question: "Wer schrieb 'Harry Potter'?", answers: ["J.K. Rowling","Stephen King","J.R.R. Tolkien","C.S. Lewis"], correctAnswer: 0},
{question: "Welcher Kontinent ist der größte der Erde?", answers: ["Asien","Afrika","Europa","Antarktika"], correctAnswer: 0},
{question: "Wie viele Zähne hat ein erwachsener Mensch normalerweise?", answers: ["28","30","32","34"], correctAnswer: 2},
{question: "Wer war der erste Mensch auf dem Mond?", answers: ["Neil Armstrong","Buzz Aldrin","Yuri Gagarin","Michael Collins"], correctAnswer: 0},
{question: "Welcher Planet ist bekannt als der Rote Planet?", answers: ["Venus","Mars","Jupiter","Saturn"], correctAnswer: 1},
{question: "Wie viele Bundesländer hat Deutschland?", answers: ["14","16","18","20"], correctAnswer: 1},
{question: "Welches Tier gilt als das größte lebende Landsäugetier?", answers: ["Elefant","Giraffe","Nilpferd","Bison"], correctAnswer: 0},
{question: "Wie heißt die Hauptstadt von Kanada?", answers: ["Toronto","Ottawa","Vancouver","Montreal"], correctAnswer: 1},
{question: "Welcher Planet hat die meisten Monde?", answers: ["Jupiter","Saturn","Uranus","Neptun"], correctAnswer: 0},
{question: "Wer erfand die Glühbirne?", answers: ["Nikola Tesla","Thomas Edison","Alexander Graham Bell","James Watt"], correctAnswer: 1},
{question: "Welche Farbe entsteht durch Mischung von Blau und Gelb?", answers: ["Grün","Lila","Orange","Braun"], correctAnswer: 0},
{question: "Wie viele Spieler hat eine Fußballmannschaft auf dem Feld?", answers: ["9","10","11","12"], correctAnswer: 2},
{question: "Welches Land ist bekannt für Pizza und Pasta?", answers: ["Frankreich","Italien","Spanien","Griechenland"], correctAnswer: 1},
{question: "Wer komponierte die 9. Symphonie (Ode an die Freude)?", answers: ["Mozart","Beethoven","Bach","Chopin"], correctAnswer: 1},
{question: "Welches Element ist notwendig für die Atmung von Menschen?", answers: ["Kohlenstoff","Sauerstoff","Stickstoff","Helium"], correctAnswer: 1},
{question: "Wie heißt der längste Fluss der Welt?", answers: ["Nil","Amazonas","Yangtze","Mississippi"], correctAnswer: 1},
{question: "Welche Währung wird in Japan verwendet?", answers: ["Yen","Dollar","Euro","Won"], correctAnswer: 0},
{question: "Welches Meer liegt zwischen Saudi-Arabien und Afrika?", answers: ["Rotes Meer","Arabisches Meer","Mittelmeer","Kaspisches Meer"], correctAnswer: 0}
]);


// Wähle nur die ersten 5 Fragen nach dem Mischen
questions = questions.slice(0, MAX_QUESTIONS);


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
        answerButton.classList.add("btn");
        answerButton.textContent = answer;
        answerButton.onclick = () => checkAnswer(index);
        answersDiv.appendChild(answerButton);
    });

    if (!jokerUsed) {
        document.getElementById("joker-button").disabled = false;
    }

    document.getElementById('timer').textContent = `Zeit: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft -= 1;
        document.getElementById('timer').textContent = `Zeit: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showFeedback(false, true);
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
        feedbackElement.className = "alert alert-warning";
    } else if (isCorrect) {
        feedbackMessage.textContent = "Richtig!";
        feedbackElement.className = "alert alert-success";
    } else {
        feedbackMessage.textContent = "Falsch!";
        feedbackElement.className = "alert alert-danger";
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

function useJoker() {
    if (jokerUsed) return;
    jokerUsed = true;
    document.getElementById("joker-button").disabled = true;

    let question = questions[currentQuestionIndex];
    let correctAnswerIndex = question.correctAnswer;
    let incorrectAnswers = question.answers
        .map((_, index) => index)
        .filter(index => index !== correctAnswerIndex);

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

function submitScore() {
    let username = document.getElementById('username').value;
    if (username.trim() === '') {
        alert("Bitte gib deinen Namen ein!");
        return;
    }

    let highscoreList = JSON.parse(localStorage.getItem('highscores')) || [];
    highscoreList.push({ name: username, score: score });

    highscoreList.sort((a, b) => b.score - a.score);

    localStorage.setItem('highscores', JSON.stringify(highscoreList));
    displayHighscores();
}

function displayHighscores() {
    document.getElementById('result').hidden = true;
    let highscoreTable = document.getElementById('highscore-table');
    highscoreTable.hidden = false;

    let highscoreList = JSON.parse(localStorage.getItem('highscores')) || [];
    let highscoreListElement = document.getElementById('highscore-list');
    highscoreListElement.innerHTML = '';

    highscoreList.forEach(entry => {
        let row = document.createElement('tr');
        row.innerHTML = `<td>${entry.name}</td><td>${entry.score}</td>`;
        highscoreListElement.appendChild(row);
    });
}

displayQuestion();

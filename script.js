// Lista 20 wyzwań z emotikonami dla lepszego UX
const challenges = [
    "Zrób 10 pompek i poczuj się silniejszy! 💪",
    "Napisz komuś miły komentarz pod postem. 😊",
    "Spędź godzinę bez telefonu. 📵",
    "Zrób 20 przysiadów. 🏋️",
    "Napisz listę 3 rzeczy, za które jesteś wdzięczny. 🙏",
    "Zadzwoń do starego przyjaciela. 📞",
    "Przeczytaj książkę przez 30 minut. 📖",
    "Zrób spacer na świeżym powietrzu. 🚶",
    "Spróbuj nowej receptury na obiad. 🍳",
    "Poświęć 15 minut na medytację. 🧘",
    "Zrób coś miłego dla kogoś innego. 🤝",
    "Posprzątaj jeden kąt w domu. 🧹",
    "Naucz się jednego nowego słowa. 📚",
    "Zrób zdjęcie czegoś pięknego. 📸",
    "Napisz krótką historię. ✍️",
    "Zjedz zdrowy posiłek. 🥗",
    "Poćwicz jogę przez 10 minut. 🧘‍♀️",
    "Zapisuj swoje myśli w dzienniku. 📓",
    "Posłuchaj nowej piosenki. 🎵",
    "Pomóż komuś w potrzebie. 🆘"
];

// Pobranie referencji do elementów DOM
const generateBtn = document.getElementById('generate-btn');
const challengeDisplay = document.getElementById('challenge-display');
const challengeText = document.getElementById('challenge-text');
const completeBtn = document.getElementById('complete-btn');
const historyBtn = document.getElementById('history-btn');
const historyDisplay = document.getElementById('history-display');
const historyList = document.getElementById('history-list');
const messageDiv = document.getElementById('message');

// Funkcja zwracająca dzisiejszą datę jako string
function getTodayString() {
    return new Date().toDateString();
}

// Funkcja ładująca dane z LocalStorage i resetująca jeśli nowa data
function loadFromStorage() {
    const today = getTodayString();
    const lastDrawDate = localStorage.getItem('lastDrawDate');
    const todaysChallenge = localStorage.getItem('todaysChallenge');
    const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges') || '[]');

    // Reset danych jeśli minęła północ
    if (lastDrawDate !== today) {
        localStorage.removeItem('todaysChallenge');
        localStorage.setItem('completedChallenges', JSON.stringify([]));
        localStorage.setItem('lastDrawDate', today);
        return { todaysChallenge: null, completedChallenges: [] };
    }

    return { todaysChallenge, completedChallenges };
}

// Funkcja zapisująca dane do LocalStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, value);
}

// Funkcja wyświetlająca komunikat użytkownikowi
function showMessage(text) {
    messageDiv.textContent = text;
    messageDiv.classList.remove('hidden');
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 3000);
}

// Funkcja animująca losowanie wyzwania (szybkie zmiany przed ostatecznym)
function animateChallengeDraw(finalChallenge) {
    let counter = 0;
    const interval = setInterval(() => {
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        challengeText.textContent = randomChallenge;
        counter++;
        if (counter >= 10) { // Po 10 zmianach zatrzymaj animację
            clearInterval(interval);
            challengeText.textContent = finalChallenge;
        }
    }, 100);
}

// Funkcja generująca nowe wyzwanie dnia
function generateChallenge() {
    const { todaysChallenge } = loadFromStorage();

    // Jeśli już wylosowano dziś, pokaż istniejące
    if (todaysChallenge) {
        challengeText.textContent = todaysChallenge;
        challengeDisplay.classList.remove('hidden');
        completeBtn.classList.remove('hidden');
        return;
    }

    // Rozpocznij animację losowania
    challengeDisplay.classList.remove('hidden');
    const finalChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    animateChallengeDraw(finalChallenge);

    // Zapisz wyzwanie po animacji
    setTimeout(() => {
        saveToStorage('todaysChallenge', finalChallenge);
        completeBtn.classList.remove('hidden');
    }, 1100); // Czas animacji + bufor
}

// Funkcja oznaczająca wyzwanie jako ukończone
function markCompleted() {
    const { todaysChallenge, completedChallenges } = loadFromStorage();

    if (!todaysChallenge) return;

    // Dodaj do ukończonych jeśli jeszcze nie jest
    if (!completedChallenges.includes(todaysChallenge)) {
        completedChallenges.push(todaysChallenge);
        saveToStorage('completedChallenges', JSON.stringify(completedChallenges));
        challengeText.classList.add('completed');
        showMessage('Gratulacje! Wyzwanie wykonane 🎉');
    }
}

// Funkcja wyświetlająca historię ukończonych wyzwań
function showHistory() {
    const { completedChallenges } = loadFromStorage();

    historyList.innerHTML = '';
    if (completedChallenges.length === 0) {
        historyList.innerHTML = '<li>Brak ukończonych wyzwań dziś.</li>';
    } else {
        completedChallenges.forEach(challenge => {
            const li = document.createElement('li');
            li.textContent = challenge;
            historyList.appendChild(li);
        });
    }
    historyDisplay.classList.toggle('hidden');
}

// Inicjalizacja po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    // Sprawdź czy już wylosowano dziś i przywróć stan
    const { todaysChallenge } = loadFromStorage();
    if (todaysChallenge) {
        challengeText.textContent = todaysChallenge;
        challengeDisplay.classList.remove('hidden');
        completeBtn.classList.remove('hidden');
        // Sprawdź czy ukończone
        const { completedChallenges } = loadFromStorage();
        if (completedChallenges.includes(todaysChallenge)) {
            challengeText.classList.add('completed');
        }
    }

    // Dodanie event listenerów
    generateBtn.addEventListener('click', generateChallenge);
    completeBtn.addEventListener('click', markCompleted);
    historyBtn.addEventListener('click', showHistory);
});
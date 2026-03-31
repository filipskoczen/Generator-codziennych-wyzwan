const challenges = [
  "Zrób 10 pompek 💪",
  "Napisz miły komentarz 😊",
  "Spędź godzinę bez telefonu 📵",
  "Przeczytaj rozdział książki 📖",
  "Zrób krótką listę rzeczy do zrobienia 📝",
  "Zrób spacer 10 minut 🚶",
  "Wypij 2 litry wody 💧",
  "Posprzątaj biurko 🧹",
  "Zadzwoń do przyjaciela 📞",
  "Napisz zadanie w dzienniku 📓",
  "Poćwicz 5 minut rozciągania 🧘",
  "Usłysz ulubioną piosenkę 🎵",
  "Zrób coś dobrego dla kogoś innego 🤝",
  "Ustaw przypomnienie na relaks 💤",
  "Zrób zdjęcie czegoś miłego 📸",
  "Napisz 3 rzeczy, za które jesteś wdzięczny 🙏",
  "Wypróbuj nowy przepis 🍳",
  "Przeczytaj artykuł edukacyjny 📚",
  "Uśmiechnij się do nieznajomego 😄",
  "Przeznacz 10 min na oddychanie 💨"
];

const generateBtn = document.getElementById('generate-btn');
const completeBtn = document.getElementById('complete-btn');
const historyBtn = document.getElementById('history-btn');
const challengeText = document.getElementById('challenge-text');
const challengeDisplay = document.getElementById('challenge-display');
const historyList = document.getElementById('history-list');
const historyDisplay = document.getElementById('history-display');
const messageDiv = document.getElementById('message');

function todayKey() {
  return new Date().toDateString();
}

function loadState() {
  const storedDate = localStorage.getItem('date');
  const now = todayKey();
  if (storedDate !== now) {
    localStorage.setItem('date', now);
    localStorage.setItem('challenge', '');
    localStorage.setItem('done', JSON.stringify([]));
    return { challenge: '', done: [] };
  }
  return {
    challenge: localStorage.getItem('challenge') || '',
    done: JSON.parse(localStorage.getItem('done') || '[]')
  };
}

function saveState(challenge, done) {
  localStorage.setItem('date', todayKey());
  localStorage.setItem('challenge', challenge);
  localStorage.setItem('done', JSON.stringify(done));
}

function showMessage(text) {
  messageDiv.textContent = text;
  messageDiv.classList.remove('hidden');
  setTimeout(() => messageDiv.classList.add('hidden'), 2000);
}

function generateChallenge() {
  const state = loadState();
  if (state.challenge) {
    challengeText.textContent = state.challenge;
    challengeDisplay.classList.remove('hidden');
    completeBtn.classList.remove('hidden');
    return;
  }
  const random = challenges[Math.floor(Math.random() * challenges.length)];
  challengeText.textContent = random;
  challengeDisplay.classList.remove('hidden');
  completeBtn.classList.remove('hidden');
  saveState(random, state.done);
}

function markCompleted() {
  const state = loadState();
  if (!state.challenge) return;
  if (!state.done.includes(state.challenge)) {
    state.done.push(state.challenge);
    saveState(state.challenge, state.done);
    challengeText.classList.add('completed');
    showMessage('Gratulacje! 🎉');
  }
}

function showHistory() {
  const state = loadState();
  historyList.innerHTML = '';
  if (!state.done.length) {
    historyList.innerHTML = '<li>Brak ukończonych wyzwań dziś.</li>';
  } else {
    state.done.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      historyList.appendChild(li);
    });
  }
  historyDisplay.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const state = loadState();
  if (state.challenge) {
    challengeText.textContent = state.challenge;
    challengeDisplay.classList.remove('hidden');
    completeBtn.classList.remove('hidden');
    if (state.done.includes(state.challenge)) challengeText.classList.add('completed');
  }

  generateBtn.addEventListener('click', generateChallenge);
  completeBtn.addEventListener('click', markCompleted);
  historyBtn.addEventListener('click', showHistory);
});

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

// Obsługa stanu wyświetlanych treści (human-friendly UX)
function displayCurrentChallenge(challengeTextValue) {
    challengeText.textContent = challengeTextValue;
    challengeDisplay.classList.remove('hidden');
    completeBtn.classList.remove('hidden');
}

// Funkcja generująca nowe wyzwanie dnia
function generateChallenge() {
    const { todaysChallenge } = loadFromStorage();

    // Jeśli już wylosowano dziś, pokaż istniejące
    if (todaysChallenge) {
        displayCurrentChallenge(todaysChallenge);
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
        displayCurrentChallenge(todaysChallenge);
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
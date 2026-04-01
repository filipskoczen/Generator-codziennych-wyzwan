// ===== BAZA WYZWAŃ =====
const challenges = [
    "🏃 Zrób 10 pompek",
    "💪 Wykonaj 20 przysiadów",
    "😊 Napisz komuś miły komentarz",
    "📵 Spędź godzinę bez telefonu",
    "📖 Przeczytaj rozdział książki",
    "🚶 Zrób spacer 20 minut",
    "💧 Wypij 2 litry wody dzisiaj",
    "🧘 Poćwicz medytację 10 minut",
    "🧹 Posprzątaj swoje biurko",
    "📞 Zadzwoń do przyjaciela",
    "📝 Napisz 3 rzeczy do zrobienia",
    "🎵 Posłuchaj ulubionej piosenki",
    "📚 Naucz się nowego słowa",
    "🤝 Zrób coś dobrego dla kogoś",
    "📸 Zrób zdjęcie czegoś pięknego",
    "🥗 Zjedz zdrowy posiłek",
    "✍️ Napisz w dzienniku 5 minut",
    "🎨 Narysuj lub pomaluj coś",
    "💝 Daj komuś komplement",
    "🧘‍♀️ Zrób 5 minut rozciągania"
];

// ===== ELEMENTY DOM =====
const generateBtn = document.getElementById('generateBtn');
const completeBtn = document.getElementById('completeBtn');
const shareBtn = document.getElementById('shareBtn');
const historyBtn = document.getElementById('historyBtn');
const challengeDisplay = document.getElementById('challengeDisplay');
const challengeText = document.getElementById('challengeText');
const historyDisplay = document.getElementById('historyDisplay');
const historyList = document.getElementById('historyList');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const todayCountEl = document.getElementById('todayCount');
const streakCountEl = document.getElementById('streakCount');
const countdownEl = document.getElementById('countdown');

// ===== FUNKCJE POMOCNICZE =====
function getTodayKey() {
    return new Date().toDateString();
}

function getStorageData() {
    const today = getTodayKey();
    const lastDate = localStorage.getItem('lastDate');
    
    // Reset jeśli nowy dzień
    if (lastDate !== today) {
        localStorage.setItem('lastDate', today);
        localStorage.setItem('challenge', '');
        localStorage.setItem('completed', JSON.stringify([]));
    }
    
    return {
        challenge: localStorage.getItem('challenge') || '',
        completed: JSON.parse(localStorage.getItem('completed') || '[]')
    };
}

function saveChallenge(challenge) {
    localStorage.setItem('challenge', challenge);
    localStorage.setItem('lastDate', getTodayKey());
}

function saveCompleted(completed) {
    localStorage.setItem('completed', JSON.stringify(completed));
}

function showMessage(text) {
    messageText.textContent = text;
    messageBox.classList.remove('hidden');
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 3000);
}

function updateStats() {
    const data = getStorageData();
    todayCountEl.textContent = data.completed.length;
    
    // Prosty streak - jeśli są wyzwania dzisiaj, streak = 1
    streakCountEl.textContent = data.completed.length > 0 ? '1' : '0';
}

function getTimeUntilMidnight() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { hours, minutes, seconds };
}

function updateCountdown() {
    const time = getTimeUntilMidnight();
    const timeStr = `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
    countdownEl.textContent = timeStr;
}

function animateChallenge(finalChallenge) {
    let count = 0;
    const interval = setInterval(() => {
        const random = challenges[Math.floor(Math.random() * challenges.length)];
        challengeText.textContent = random;
        count++;
        if (count >= 8) {
            clearInterval(interval);
            challengeText.textContent = finalChallenge;
        }
    }, 100);
}

// ===== GŁÓWNE FUNKCJE =====
function generateChallenge() {
    let data = getStorageData();
    
    // Jeśli już wylosowano dziś, pokaż istniejące
    if (data.challenge) {
        challengeText.textContent = data.challenge;
        challengeDisplay.classList.remove('hidden');
        completeBtn.classList.remove('hidden');
        shareBtn.classList.remove('hidden');
        
        // Jeśli już ukończone, pokaż to
        if (data.completed.includes(data.challenge)) {
            challengeText.classList.add('completed');
        } else {
            challengeText.classList.remove('completed');
        }
        return;
    }
    
    // Wylosuj nowe
    const random = challenges[Math.floor(Math.random() * challenges.length)];
    
    challengeDisplay.classList.remove('hidden');
    completeBtn.classList.remove('hidden');
    shareBtn.classList.remove('hidden');
    challengeText.classList.remove('completed');
    
    animateChallenge(random);
    
    setTimeout(() => {
        saveChallenge(random);
    }, 900);
}

function completeChallenge() {
    let data = getStorageData();
    
    if (!data.challenge) return;
    
    if (data.completed.includes(data.challenge)) {
        showMessage('To wyzwanie już zostało ukończone dzisiaj! 🎉');
        return;
    }
    
    data.completed.push(data.challenge);
    saveCompleted(data.completed);
    
    challengeText.classList.add('completed');
    showMessage('Gratulacje! 🎉 Wyzwanie wykonane! To był dobry dzień.');
    
    updateStats();
}

function toggleHistory() {
    const data = getStorageData();
    
    historyList.innerHTML = '';
    
    if (data.completed.length === 0) {
        historyList.innerHTML = '<li class="empty-state">Brak jeszcze wykonanych wyzwań. Zacznij od kliknięcia "Wylosuj wyzwanie!"</li>';
    } else {
        data.completed.forEach((challenge, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${challenge}`;
            historyList.appendChild(li);
        });
    }
    
    historyDisplay.classList.toggle('hidden');
}

function shareChallenge() {
    const data = getStorageData();
    
    if (!data.challenge) {
        showMessage('Wylosuj wyzwanie, aby je udostępnić!');
        return;
    }
    
    const text = `Spróbuję dzisiaj tego wyzwania: "${data.challenge}" 💪 Dołącz do mnie! #GeneratorWyzwań`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Wyzwanie dnia',
            text: text
        }).catch(err => console.log('Błąd podczas udostępniania:', err));
    } else {
        // Fallback - kopiuj do schowka
        navigator.clipboard.writeText(text)
            .then(() => showMessage('Wyzwanie skopiowane do schowka! 📋'))
            .catch(() => showMessage('Nie można skopiować do schowka'));
    }
}

// ===== INICJALIZACJA =====
document.addEventListener('DOMContentLoaded', () => {
    // Przywróć stan z poprzedniego sesji
    const data = getStorageData();
    
    if (data.challenge) {
        challengeText.textContent = data.challenge;
        challengeDisplay.classList.remove('hidden');
        completeBtn.classList.remove('hidden');
        shareBtn.classList.remove('hidden');
        
        if (data.completed.includes(data.challenge)) {
            challengeText.classList.add('completed');
        }
    }
    
    updateStats();
    updateCountdown();
    
    // Aktualizuj licznik co sekundę
    setInterval(updateCountdown, 1000);
    
    // Event listenery
    generateBtn.addEventListener('click', generateChallenge);
    completeBtn.addEventListener('click', completeChallenge);
    shareBtn.addEventListener('click', shareChallenge);
    historyBtn.addEventListener('click', toggleHistory);
    
    // Obsługa klawisza Enter
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !challengeDisplay.classList.contains('hidden')) {
            if (e.target.tagName !== 'BUTTON') {
                completeChallenge();
            }
        }
    });
});

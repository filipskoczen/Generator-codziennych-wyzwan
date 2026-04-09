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

const generateBtn = document.getElementById('generateBtn');
const completeBtn = document.getElementById('completeBtn');
const shareBtn = document.getElementById('shareBtn');
const rerollBtn = document.getElementById('rerollBtn');
const historyBtn = document.getElementById('historyBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const challengeDisplay = document.getElementById('challengeDisplay');
const challengeText = document.getElementById('challengeText');
const historyDisplay = document.getElementById('historyDisplay');
const historyList = document.getElementById('historyList');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const todayCountEl = document.getElementById('todayCount');
const streakCountEl = document.getElementById('streakCount');
const countdownEl = document.getElementById('countdown');

function getTodayKey() {
    return new Date().toDateString();
}

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function getStorageData() {
    const today = getTodayKey();
    const lastDate = localStorage.getItem('lastDate');

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
    
    streakCountEl.textContent = data.completed.length > 0 ? '1' : '0';
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

function generateChallenge() {
    let data = getStorageData();
    
    if (data.challenge) {
        challengeText.textContent = data.challenge;
        challengeDisplay.classList.remove('hidden');
        completeBtn.classList.remove('hidden');
        shareBtn.classList.remove('hidden');
        
        const isCompleted = data.completed.some(item => item.challenge === data.challenge);
        if (isCompleted) {
            challengeText.classList.add('completed');
            rerollBtn.classList.remove('hidden');
            completeBtn.classList.add('hidden');
        } else {
            challengeText.classList.remove('completed');
            rerollBtn.classList.add('hidden');
            completeBtn.classList.remove('hidden');
        }
        return;
    }
    
    const random = challenges[Math.floor(Math.random() * challenges.length)];
    
    challengeDisplay.classList.remove('hidden');
    completeBtn.classList.remove('hidden');
    shareBtn.classList.remove('hidden');
    rerollBtn.classList.add('hidden');
    challengeText.classList.remove('completed');
    
    animateChallenge(random);
    
    setTimeout(() => {
        saveChallenge(random);
    }, 900);
}

function completeChallenge() {
    let data = getStorageData();
    
    if (!data.challenge) return;
    
    const isCompleted = data.completed.some(item => item.challenge === data.challenge);
    if (isCompleted) {
        showMessage('To wyzwanie już zostało ukończone dzisiaj! 🎉');
        return;
    }
    
    data.completed.push({
        challenge: data.challenge,
        completedAt: getCurrentTime()
    });
    saveCompleted(data.completed);
    
    challengeText.classList.add('completed');
    completeBtn.classList.add('hidden');
    rerollBtn.classList.remove('hidden');
    showMessage('Gratulacje! 🎉 Wyzwanie wykonane! To był dobry dzień.');
    
    updateStats();
}

function toggleHistory() {
    const data = getStorageData();
    
    historyList.innerHTML = '';
    
    if (data.completed.length === 0) {
        historyList.innerHTML = '<li class="empty-state">Brak jeszcze wykonanych wyzwań. Zacznij od kliknięcia "Wylosuj wyzwanie!"</li>';
    } else {
        data.completed.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<div class="history-item">
                <span class="history-challenge">${index + 1}. ${item.challenge}</span>
                <span class="history-time">⏰ ${item.completedAt}</span>
            </div>`;
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
        navigator.clipboard.writeText(text)
            .then(() => showMessage('Wyzwanie skopiowane do schowka! 📋'))
            .catch(() => showMessage('Nie można skopiować do schowka'));
    }
}

function rerollChallenge() {
    localStorage.setItem('challenge', '');
    challengeDisplay.classList.add('hidden');
    completeBtn.classList.add('hidden');
    shareBtn.classList.add('hidden');
    rerollBtn.classList.add('hidden');
    showMessage('Wyzwanie resetowane! 🎲 Wylosuj nowe.');
}

function clearHistory() {
    if (confirm('Czy na pewno chcesz wyczyścić całą historię dzisiaj? ⚠️')) {
        localStorage.setItem('completed', JSON.stringify([]));
        showMessage('Historia wyczyszczona! 🗑️');
        updateStats();
        toggleHistory();
        
        const data = getStorageData();
        if (data.challenge && challengeText.textContent === data.challenge) {
            challengeText.classList.remove('completed');
            completeBtn.classList.remove('hidden');
            rerollBtn.classList.add('hidden');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const data = getStorageData();
    
    if (data.challenge) {
        challengeText.textContent = data.challenge;
        challengeDisplay.classList.remove('hidden');
        completeBtn.classList.remove('hidden');
        shareBtn.classList.remove('hidden');
        
        const isCompleted = data.completed.some(item => item.challenge === data.challenge);
        if (isCompleted) {
            challengeText.classList.add('completed');
            completeBtn.classList.add('hidden');
            rerollBtn.classList.remove('hidden');
        } else {
            challengeText.classList.remove('completed');
            rerollBtn.classList.add('hidden');
        }
    }
    
    updateStats();
    
    generateBtn.addEventListener('click', generateChallenge);
    completeBtn.addEventListener('click', completeChallenge);
    shareBtn.addEventListener('click', shareChallenge);
    rerollBtn.addEventListener('click', rerollChallenge);
    historyBtn.addEventListener('click', toggleHistory);
    clearHistoryBtn.addEventListener('click', clearHistory);

    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !challengeDisplay.classList.contains('hidden')) {
            if (e.target.tagName !== 'BUTTON') {
                completeChallenge();
            }
        }
    });
});

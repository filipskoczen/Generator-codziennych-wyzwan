# Generator Codziennych Wyzwań ⭐

Interaktywna, responsywna strona internetowa, która codziennie generuje losowe wyzwań dla użytkownika. Aplikacja wykorzystuje HTML, CSS i JavaScript do dynamicznych interakcji, z danymi przechowywanymi w LocalStorage.

## 🎯 Główne Funkcjonalności

### 1. Losowanie Wyzwania Dnia
- Przycisk **„Wylosuj wyzwanie!"** generuje losowe zadanie z bazy 20 wyzwań
- Animacja losowania: szybkie przełączanie między wyzwaniami przed ostatecznym wyborem
- Blokada ponownego losowania tego samego dnia (sprawdzenie daty w LocalStorage)
- Każde wyzwanie ma unikalną ikonę emoji

### 2. Oznaczanie Wyzwania jako Wykonane
- Przycisk **„Ukończone!"** pojawia się po wylosowaniu zadania
- Kliknięcie zmienia kolor tekstu na zielony i dodaje przekreślenie
- Komunikat gratulacyjny z emotikoną 🎉
- Wyzwanie zostaje zapisane na liście dzisiejszych osiągnięć

### 3. Historia Wykonanych Wyzwań
- Przycisk **„Pokaż historię"** wyświetla listę wszystkich ukończonych wyzwań z dnia
- Numerowana lista z animacją wejścia
- Wskaźnik liczby wykonanych wyzwań
- Automatyczne resetowanie po północy (zmiana daty)

### 4. Udostępnianie Wyzwania
- Przycisk **„Podziel się"** pozwala udostępnić wyzwanie innym
- Obsługa natywnego API `navigator.share` (mobile)
- Fallback do kopiowania do schowka dla przeglądarek bez wsparcia

### 5. Statystyki 📊
- Wyświetlanie liczby wyzwań ukończonych dzisiaj
- Prosty licznik streaku (dni z rzędu)
- Aktualizacja w czasie rzeczywistym

## 🎨 Wymagania dotyczące Wyglądu

✅ **Responsywność**
- Pełna obsługa komputerów, tabletów i telefonów
- Media queries dla ekranów: 768px i 480px

✅ **Nowoczesny Design**
- Gradient tła (fioletowo-niebieski/różowy)
- Zaokrąglone przyciski i karty (border-radius: 12-16px)
- Przyjemna kolorystyka z systemem zmiennych CSS

✅ **Animacje CSS**
- `slideDown` - nagłówek
- `fadeInUp` - sekcje główne
- `bounceIn` - wylosowane wyzwanie
- `slideInLeft` - historia
- `slideInRight` - komunikaty
- Efekty hover na przyciskach (podniesienie + cień)

✅ **Ikony i Emotikony**
- Każde wyzwanie ma własną ikonę
- Komunikaty zawierają emoji dla lepszego UX
- Przyciski mają symboliczne ikonki

✅ **Typografia**
- System czcionek: `system-ui, -apple-system, BlinkMacSystemFont`
- Hierarchia wielkości: h1 (2.5rem), h2 (1.8rem), h3 (1.3rem), body (1rem)
- Linie (line-height: 1.6) dla czytaności

## 🛠️ Struktura Techniczna

### Pliki
```
Generator-codziennych-wyzwan/
├── index.html     # Struktura HTML
├── style.css      # Style CSS z animacjami
├── script.js      # Logika JavaScript
├── README.md      # Dokumentacja
```

### Technologie
- **HTML5** - semantyczna struktura
- **CSS3** - modern design, animacje, flexbox/grid
- **JavaScript (ES6+)** - logika interakcji
- **LocalStorage API** - przechowywanie danych

## 📋 Baza 20 Wyzwań

1. 🏃 Zrób 10 pompek
2. 💪 Wykonaj 20 przysiadów
3. 😊 Napisz komuś miły komentarz
4. 📵 Spędź godzinę bez telefonu
5. 📖 Przeczytaj rozdział książki
6. 🚶 Zrób spacer 20 minut
7. 💧 Wypij 2 litry wody dzisiaj
8. 🧘 Poćwicz medytację 10 minut
9. 🧹 Posprzątaj swoje biurko
10. 📞 Zadzwoń do przyjaciela
11. 📝 Napisz 3 rzeczy do zrobienia
12. 🎵 Posłuchaj ulubionej piosenki
13. 📚 Naucz się nowego słowa
14. 🤝 Zrób coś dobrego dla kogoś
15. 📸 Zrób zdjęcie czegoś pięknego
16. 🥗 Zjedz zdrowy posiłek
17. ✍️ Napisz w dzienniku 5 minut
18. 🎨 Narysuj lub pomaluj coś
19. 💝 Daj komuś komplement
20. 🧘‍♀️ Zrób 5 minut rozciągania

## 🚀 Jak Używać

1. **Otwórz stronę**
   - Otwórz plik `index.html` w dowolnej przeglądarce internetowej

2. **Wylosuj wyzwanie**
   - Kliknij przycisk `🎲 Wylosuj wyzwanie!`
   - Animacja losowania wyświetli kilka wyzwań, zanim wybierze ostateczne

3. **Wykonaj wyzwanie**
   - Zrób to, co sugeruje Ci wylosowane zadanie
   - Pracuj w swoim tempie

4. **Zaznacz jako ukończone**
   - Gdy skończysz, kliknij `✅ Ukończone!`
   - Zobaczysz komunikat gratulacyjny
   - Tekst wyzwania zmieni się na zielony z przekreśleniem

5. **Udostępnij (opcjonalnie)**
   - Kliknij `📤 Podziel się`, aby wysłać wyzwanie przyjaciołom
   - Lub skopiuj na schowek jeśli brak wsparcia native share API

6. **Sprawdź historię**
   - Kliknij `📋 Pokaż historię dzisiaj`, aby zobaczyć wszystkie ukończone wyzwania
   - Historia automatycznie się resetuje każdego dnia o północy

7. **Śledź postępy**
   - Statystyki w dolnej sekcji pokazują ile wyzwań wykonałeś dzisiaj
   - Prosty streak pokazuje czy byłeś aktywny

## 💾 Przechowywanie Danych (LocalStorage)

Aplikacja przechowuje 3 klucze w LocalStorage:

```javascript
// Dzisiejsza data (string) - używana do resetowania po północy
localStorage.getItem('lastDate') 

// Bieżące wylosowane wyzwanie
localStorage.getItem('challenge')

// Tablica ukończonych wyzwań w formacie JSON
localStorage.getItem('completed') 
```

**Reset danych**: Wpisanie `localStorage.clear()` w konsoli wyczyści wszystkie dane aplikacji.

## ⚙️ Automatyzm

### Reset o Północy
- Aplikacja automatycznie researchuje datę przy każdym załadowaniu
- Jeśli data się zmieniła od ostatniej sesji, wszystkie dane są resetowane
- Historia i bieżące wyzwanie są usuwane, ale statystyki mogą być czytane z historii przeglądania

### Przywrócenie Sesji
- Przy załadowaniu strony aplikacja odczytuje poprzednie wyzwanie
- Jeśli było już wylosowane, wyświetli to samo wyzwanie
- Wskaźnik "ukończone" jest przywracany jeśli był już zaznaczony

## 🌐 Kompatybilność Przeglądarek

- ✅ Chrome/Edge (najnowsze)
- ✅ Firefox (najnowsze)
- ✅ Safari (najnowsze)
- ✅ Opera (najnowsze)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 📱 Responsywność

- **Desktop** (1200px+) - pełny layout z 3-kolumnową siatką
- **Tablet** (768px - 1199px) - dostosowana siatka
- **Mobile** (< 768px) - jednolumnowy layout
- **Mały telefon** (< 480px) - zminifikowane UI, przycisk w pełnej szerokości

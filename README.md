# Generator Codziennych Wyzwań

Interaktywna aplikacja webowa generująca losowe codzienne wyzwania dla użytkowników. Strona wykorzystuje HTML, CSS i JavaScript do dynamicznych interakcji, z danymi przechowywanymi w LocalStorage.

## Funkcjonalności

### Losowanie wyzwania dnia
- Przycisk "Wylosuj wyzwanie!" generuje losowe wyzwanie z bazy 20 różnych aktywności
- Każde wyzwanie zawiera krótki opis wyjaśniający jego korzyści
- Animacja losowania: szybkie zmiany tekstu przed ostatecznym wyborem
- Blokada ponownego losowania tego samego dnia (sprawdzanie daty w LocalStorage)

### Oznaczanie wyzwania jako wykonane
- Przycisk "Ukończone!" po wylosowaniu zadania
- Zielone podkreślenie ukończonego wyzwania
- Komunikat gratulacyjny z emotikonami

### Historia wykonanych wyzwań
- Przycisk "Pokaż historię" wyświetla listę ukończonych wyzwań z bieżącego dnia
- Automatyczny reset danych po północy (zmiana daty)

### Sekcja informacyjna
- Opis aplikacji i korzyści z codziennych wyzwań
- Instrukcje użytkowania

## Wygląd (UI/UX)

- **Responsywny design** - działa na komputerach i urządzeniach mobilnych
- **Nowoczesny, minimalistyczny design** z animacjami CSS
- **Przyjazna typografia** i czytelny układ
- **Subtelne efekty przejść**: fade-in, hover, bounce-in
- **Ikony i emotikony** dla lepszego UX

## Technologie

- HTML5
- CSS3 (z animacjami i media queries)
- JavaScript (ES6+, LocalStorage)

## Struktura projektu

- `index.html` - struktura strony
- `style.css` - wygląd strony z animacjami
- `script.js` - logika JavaScript z LocalStorage
- `README.md` - dokumentacja projektu

## Jak używać

1. Otwórz plik `index.html` w przeglądarce internetowej
2. Kliknij "Wylosuj wyzwanie!" aby otrzymać losowe wyzwanie dnia
3. Po wykonaniu kliknij "Ukończone!" aby oznaczyć jako wykonane
4. Użyj "Pokaż historię" aby zobaczyć ukończone wyzwania z dnia

## Przechowywanie danych

Aplikacja używa LocalStorage do:
- Przechowywania daty ostatniego losowania
- Zapamiętywania dzisiejszego wyzwania
- Przechowywania listy ukończonych wyzwań (resetowana codziennie)

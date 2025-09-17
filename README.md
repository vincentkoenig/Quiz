# Quiz

Ein interaktives Quiz, das Allgemeinwissen auf spielerische Weise abfragt. Das Quiz enthält Multiple-Choice-Fragen, ein 50:50 Joker, einen Timer und eine Highscore-Tabelle, in der die besten Spieler gespeichert werden.

## Features

- **Multiple-Choice-Fragen**: Eine Sammlung von Fragen über den Islam mit vier Antwortmöglichkeiten.
- **Timer**: Jede Frage hat ein Zeitlimit von 10 Sekunden.
- **50:50 Joker**: Der Joker entfernt zwei falsche Antworten, um die Wahl zu erleichtern.
- **Punktzahl**: Deine Punktzahl wird basierend auf richtigen Antworten berechnet.
- **Highscore-Tabelle**: Nach Abschluss des Quizzes kannst du deinen Namen eingeben, um deine Punktzahl zu speichern. Highscores werden lokal gespeichert.
- **Feedback**: Nach jeder Antwort gibt es sofortiges Feedback (Richtig/Falsch oder Zeit abgelaufen).
- **Responsive Design**: Dank der Nutzung von Bootstrap ist das Quiz auf verschiedenen Geräten gut nutzbar.

## Technologien

- **HTML**: Struktur der Seite.
- **CSS**: Styling der Benutzeroberfläche, einschließlich eines Hintergrundbildes und responsiver Gestaltung.
- **JavaScript**: Für die Logik des Quizzes, einschließlich Fragen, Timer, Joker und Highscore-Funktionalität.
- **Bootstrap 5**: Für das Layout und das Design der Seite.

## Installation

1. Klone das Repository oder lade die Dateien herunter:
   ```bash
   git clone <repository-url>
   ```
2. Stelle sicher, dass du eine funktionierende Internetverbindung hast, da das Quiz auf externe Bibliotheken zugreift (Bootstrap).
3. Öffne die `quiz.html`-Datei in deinem Browser, um das Quiz zu starten.

## Benutzung

1. **Fragen beantworten**: Wähle die Antwort, die du für korrekt hältst. Es gibt einen Timer, der die Zeit für jede Frage begrenzt (10 Sekunden).
2. **50:50 Joker**: Wenn du Schwierigkeiten hast, kannst du den 50:50 Joker verwenden, der zwei falsche Antworten entfernt.
3. **Punktzahl**: Deine Punktzahl wird nach jeder Frage angezeigt.
4. **Highscore speichern**: Nach Abschluss des Quizzes kannst du deinen Namen eingeben und deine Punktzahl speichern. Diese wird in einer Highscore-Tabelle angezeigt, die lokal gespeichert wird.
5. **Highscore anzeigen**: Die gespeicherten Highscores werden nach dem Quiz in einer Tabelle angezeigt.

## Code-Erklärung

- **shuffleQuestions**: Eine Funktion, die die Fragen in zufälliger Reihenfolge anzeigt.
- **displayQuestion**: Zeigt die aktuelle Frage und die Antworten an. Der Timer wird gestartet und der Joker-Button aktiviert.
- **checkAnswer**: Überprüft, ob die Antwort des Benutzers korrekt ist, und zeigt Feedback an.
- **showFeedback**: Zeigt das Feedback für die Antwort (richtig/falsch oder Zeit abgelaufen) an.
- **useJoker**: Entfernt zwei falsche Antworten, wenn der Benutzer den Joker verwendet.
- **submitScore**: Speichert den Highscore im localStorage und zeigt die Highscore-Tabelle an.
- **displayHighscores**: Zeigt die gespeicherten Highscores an.

## Weiterentwicklungen und mögliche Verbesserungen

- **Schwierigkeitsgrade**: Füge verschiedene Schwierigkeitsgrade hinzu (z.B. Anfänger, Fortgeschrittene).
- **Soundeffekte**: Füge Soundeffekte für richtige oder falsche Antworten hinzu.
- **Multiple Joker**: Füge zusätzliche Joker-Optionen hinzu (z.B. „Publikumsjoker“ oder „Fragen überspringen“).

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert – siehe die [LICENSE](LICENSE) Datei für Details.

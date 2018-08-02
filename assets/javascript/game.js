var words = ["hangman", "guessing", "game", "apples", "bananas", "fruit"];
var userGuess = [];
var guessLeft = 6;
var word = words[0];
var win = 0;
var loss = 0;
var underscores = underscore(word);
var guess;
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var wordsIndex = 0;

function nextWord() {
    if (wordsIndex < words.length) {
        return words[wordsIndex];
    }
    else {
        wordsIndex = 0;
        return words[wordsIndex];
    }
}

function underscore(word) {
    underscores = [];
    for (i = 0; i < word.length; i++) {
        underscores.push("_");
    }
    return underscores
}

function winner() {
    wordsIndex++;
    word = nextWord();
    underscore(word);
    document.getElementById("word").textContent = underscores.join(' ');
    win++;
    document.getElementById("wins").textContent = win;
    guessLeft = 6;
    document.getElementById("guess-left").textContent = guessLeft;
    userGuess = [];
    document.getElementById("guesses").textContent = userGuess;
}

function loser() {
    wordsIndex++;
    word = nextWord();
    underscore(word);
    document.getElementById("word").textContent = underscores.join(' ');
    loss++;
    document.getElementById("losses").textContent = loss;
    guessLeft = 6;
    document.getElementById("guess-left").textContent = guessLeft;
    userGuess = [];
    document.getElementById("guesses").textContent = userGuess;
}

function loseGuess() {
    guessLeft--;
    document.getElementById("guess-left").textContent = guessLeft;
    return guessLeft;
}

function replaceUnderscore(letter, index) {
    underscores[index] = letter;
    return underscores;
}

function correctLetter(letter, word) {
    for (var i = 0; i < word.length; i++) {
        if (letter === word[i]) {
            replaceUnderscore(letter, i);
        }
    }
    return underscores;
}

document.onkeyup = function (event) {
    document.getElementById("word").textContent = underscores.join(' ');
    var guess = event.key;
    if (alphabet.includes(guess)) {
        if (word.includes(guess)) {
            correctLetter(guess, word);
            document.getElementById("word").textContent = underscores.join(' ');
            if (underscores.join('') === word) {
                winner();
            }
        } else {
            if (userGuess.includes(guess)) {
                return;
            } else {
                userGuess.push(guess);
                document.getElementById("guesses").textContent = userGuess;
                document.getElementById("word").textContent = underscores.join(' ');
                loseGuess();
                if (guessLeft === 0) {
                    loser();
                }
            }
        }
    }
}
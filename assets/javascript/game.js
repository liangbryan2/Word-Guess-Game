var words = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard",
    "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle",
    "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate",
    "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash",
    "nidoran", "nidorina", "nidoqueen", "nidoran", "nidorino", "nidoking", "clefairy",
    "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat",
    "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth",
    "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey",
    "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath",
    "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout",
    "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler",
    "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton",
    "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder",
    "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby",
    "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak",
    "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon",
    "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking",
    "staryu", "starmie", "mrmime", "scyther", "jynx", "electabuzz", "magmar",
    "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee",
    "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto",
    "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres",
    "dratini", "dragonair", "dragonite", "mewtwo", "mew"];

var userGuess = [];
var guessLeft = 8;
var word = randomWord();
var win = 0;
var loss = 0;
var underscores = underscore(word);
var guess;
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var wordsIndex = 0;
var previousWord = "";

function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function nextWord() {
    if (wordsIndex < words.length) {
        return words[wordsIndex];
    } else {
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
    previousWord = word;
    document.getElementById("previous-word").textContent = previousWord;
    word = randomWord();
    underscore(word);
    document.getElementById("word").textContent = underscores.join(' ');
    win++;
    document.getElementById("wins").textContent = win;
    guessLeft = 8;
    document.getElementById("guess-left").textContent = guessLeft;
    userGuess = [];
    document.getElementById("guesses").textContent = userGuess;
}

function loser() {
    previousWord = word;
    document.getElementById("previous-word").textContent = previousWord;
    word = randomWord();
    underscore(word);
    document.getElementById("word").textContent = underscores.join(' ');
    loss++;
    document.getElementById("losses").textContent = loss;
    guessLeft = 8;
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
    var guess = event.key.toLowerCase();
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
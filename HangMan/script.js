const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

// for now just making preset words to play the game with. In the future we can fetch from a random word api
const words = ['application', 'programming', 'interface', 'wizard'];

// to randomly select one of the preset words from above array
let selectedWord = words[Math.floor(Math.random() * words.length)];

// console.log(selectedWord);

// letters guessed correctly/incorrectly get added to these arrays
const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
    wordEl.innerHTML = `
     ${selectedWord
        // split= turning the selctedWord (a string) into an array that can be mapped through. Join() is used to turn array back into string at the end
        .split('')
        // is the current letter we're looping through included in the correctLetters array? If so, show the letter. Else (:) return empty string
        .map(letter => `
            <span class="letter">
              ${correctLetters.includes(letter) ? letter : ''}
            </span>
        `).join('')} 
    `;

    // to replace the new line character with an empty string (globally)
    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord) {
        finalMessage.innerText = 'You Won!';
        popup.style.display = 'flex';
    }
    
}

displayWord();
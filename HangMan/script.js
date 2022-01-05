const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
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


// update the wrong letters array
function updateWrongLettersEl() {
    // display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // display stick figure parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Check if lost 
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'You Lost';
        popup.style.display = 'flex';
    }
}


//show notification- add'show' class to notification element and then remove after 2 seconds
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Keydown letter press. Each letter on the keyboard has a keycode. Since we only want letters we would be looking for keycodes in the range of 65(A) and 90(z). 
window.addEventListener('keydown', e => {
    //console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <=90) {
        // store key they entered in variable letter
        const letter = e.key;

        // if the  selected word includes the key the user chose, we want to push the letter onto the correctLetters array (if its not already there)
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                //now update the wordEl to show the new letter
                displayWord();
            } else {
                showNotification();
            }
        // otherwise push incorrect letter to wrongLetters array (as long as that letter wasnt already there)
        } else {
             if(!wrongLetters.includes(letter)) {
                 wrongLetters.push(letter);

                 updateWrongLettersEl();
             } else {
                 showNotification();
             }
        }
    }
});

// Restart Game and play again
playAgainBtn.addEventListener('click', () => {
    // empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
})

displayWord();
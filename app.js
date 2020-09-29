const WORDEL = document.querySelector('#word');
const WRONGLETTERSCONTAINER = document.querySelector('.wrong-letters-container');
const PLAYAGAIN = document.querySelector('#play-again');
const POPUP = document.querySelector('#popup--container');
const NOTIFICATION = document.querySelector('#notification--container');
const MESSAGE = document.querySelector('#final--message');
const FIGUREPARTS = document.querySelectorAll('.figure--parts');

let WORDS = ["shishir", "is", "best", "in", "the", "world"];
let selectedWord = WORDS[Math.floor(Math.random() * WORDS.length)]

const CORRECTLETTERS = [];
const WRONGLETTERS = [];

function displayWord() {
    WORDEL.innerHTML = `
    ${selectedWord
            .split('')
            .map(letter => `<span class="letter">${CORRECTLETTERS.includes(letter) ? letter : ''}</span>`)
            .join('')}`
    const innerword = WORDEL.innerText.replace(/\n/g, '');
    if (innerword === selectedWord) {
        MESSAGE.innerText = `Congragulation! you have won!`;
        POPUP.style.display = 'flex';
    }
}


const playAgain = () => {

    CORRECTLETTERS.length = 0;
    WRONGLETTERS.length = 0;
    WRONGLETTERSCONTAINER.innerHTML = ``;
    FIGUREPARTS.forEach(part => part.style.display = 'none')
    WORDS = ["shishir", "is", "best", "in", "the", "world"];
    selectedWord = WORDS[Math.floor(Math.random() * WORDS.length)]
    displayWord();
    POPUP.style.display = 'none';
}

const showWrongLetter = () => {
    WRONGLETTERSCONTAINER.innerHTML = `
    ${WRONGLETTERS.length > 0 ? '<p>Wrong</p>' : ''}
    ${WRONGLETTERS.map(letter => `<span>${letter}</span>`)}`

    FIGUREPARTS.forEach((part, index) => {
        const err = WRONGLETTERS.length;
        if (index < err) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    if (WRONGLETTERS.length === FIGUREPARTS.length) {
        MESSAGE.innerText = `Unfortunately you lost.`;
        POPUP.style.display = 'flex';
    }

}
const showNotification = () => {
    NOTIFICATION.classList.add('show');
    setTimeout(() => NOTIFICATION.classList.remove('show'), 2000)

}

window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 95) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!CORRECTLETTERS.includes(letter)) {
                CORRECTLETTERS.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!WRONGLETTERS.includes(letter)) {
                WRONGLETTERS.push(letter);
                showWrongLetter();
            } else {
                showNotification();
            }
        }
    }
})

PLAYAGAIN.addEventListener('click', playAgain)

displayWord();


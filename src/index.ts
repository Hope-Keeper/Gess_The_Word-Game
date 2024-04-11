import { initialState, State } from './state'

const wordEl = document.getElementById('word') as HTMLDivElement
const wrongLettersEl = document.getElementById(
  'wrong-letters'
) as HTMLDivElement
const playAgainBtn = document.getElementById('play-button') as HTMLButtonElement
const popup = document.getElementById('popup-container') as HTMLDivElement
const notification = document.getElementById(
  'notification-container'
) as HTMLDivElement
const finalMessage = document.getElementById('final-message') as HTMLElement
const finalMessageRevealWord = document.getElementById(
  'final-message-reveal-word'
) as HTMLElement

const figureParts: NodeListOf<SVGElement> =
  document.querySelectorAll('.figure-part')

function displayWord(selectedWord: string, correctLetters: string[]) {
  console.log(wordEl)

  console.log(correctLetters)

  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')}
  `
}

function displayWrongLetters(wrongLetters: string[]) {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length

    if (index < errors) {
      part.style.display = 'block'
    } else {
      part.style.display = 'none'
    }
  })
}

function displaySuccessPopup() {
  finalMessage.innerText = 'Congratulations! You won! 😃'
  finalMessageRevealWord.innerText = ''
  popup.style.display = 'flex'
}

function displayFailPopup(selectedWord: string) {
  finalMessage.innerText = 'Unfortunately you lost. 😕'
  finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`
  popup.style.display = 'flex'
}

function clearPopup() {
  popup.style.display = 'none'
}

function alreadyEnteredPopup() {
  notification.classList.add('show')

  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}

export function main(words: string[]) {
  let state: State = initialState(
    words[Math.floor(Math.random() * words.length)]
  )
  let arr: string[] = []

  window.addEventListener('keydown', (e) => {
    // your code here

    if (state.wrongLetters.length >= state.selectedWord.split('').length) {
      state.playable = false
      displayFailPopup(state.selectedWord)
    }
    if (state.correctLetters.length === state.selectedWord.split('').length) {
      state.playable = false
      displaySuccessPopup()
    }

    console.log(state.selectedWord)
    console.log('arr', arr)

    if (arr.includes(e.key)) {
      console.log('oh noo')

      alreadyEnteredPopup()
    } else {
      arr.push(e.key)

      arr.forEach((letter) => {
        if (state.selectedWord.split('').includes(letter)) {
          state.correctLetters.push(letter)
          displayWord(state.selectedWord, state.correctLetters)
        } else {
          state.wrongLetters.push(letter)
          displayWrongLetters(state.wrongLetters)
        }
      })
    }

    console.log(state.correctLetters)
    // displayWord(state.selectedWord, state.correctLetters)
  })

  playAgainBtn.addEventListener('click', () => {
    // your code here

    wrongLettersEl.innerHTML = ''
    wordEl.innerHTML = ''
    arr = []
    state = initialState(words[Math.floor(Math.random() * words.length)])
    clearPopup()
    displayWord(state.selectedWord, state.correctLetters)
  })

  displayWord(state.selectedWord, state.correctLetters)
}

const words = ['typescript', 'interface', 'wizard']
main(words)

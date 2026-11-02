const ready = document.querySelector('#Ready')
const explosion = document.getElementById('explosion')
const image = document.getElementById('oldinterface')
const frog = document.querySelector('#frog')
const cat = document.querySelector('#cat')
const picture = document.querySelector('#questionpicture')
const pictureImage = picture.querySelector('img')
const tiles = document.querySelector('#tiles')
const answers = document.querySelector('#geefantwoorden')
const title = document.querySelector('#titlechange')
const result = document.querySelector('#round-result')
const questionCounter = document.querySelector('#question-counter')
const questionText = document.querySelector('#question-text')
const celebration = document.getElementById('final-celebration')
const restartButton = document.querySelector('#restart-button')
const answerButtons = answers.querySelectorAll('button')
const questions = [
    {
        question: 'What is shown in the picture?',
        image: 'oldinterface.png',
        answers: ['A: Blank browser window', 'B: Grey background ', 'C: Green ball'],
        correctAnswer: 0
    },
    {
        question: 'What animal is in the picture?',
        image: 'penguin.png',
        answers: ['A: Falcon', 'B: Penguin', 'C: Bird'],
        correctAnswer: 1
    },
    {
        question: 'What animal is in the picture?',
        image: 'hamster.png',
        answers: ['A: Dog', 'B: Cat', 'C: Hamster'],
        correctAnswer: 2
    },
    {
        question: 'Wat is the animal in the picture?',
        image: 'cat.png',
        answers: ['A: Dragon', 'B: Cat', 'C: Grijze tapijt'],
        correctAnswer: 1
    },
    {
        question: 'Wat is the animal in the picture?',
        image: 'frog.png',
        answers: ['A: frog', 'B: Groene kaas', 'C: Green wallpaper '],
        correctAnswer: 0
    }
]
const tileCount = 20          
const tileDelay = 700         
let questionIndex = 0
let startedAt
let sessionPoints = 0
let revealTimer

function coverPicture() {
    clearInterval(revealTimer)
    tiles.innerHTML = ''

    for (let i = 0; i < tileCount; i++) {
        const tile = document.createElement('div')
        tile.className = 'tile'
        tiles.appendChild(tile)
    }

    const order = [...tiles.children].sort(() => Math.random() - 0.5)

    revealTimer = setInterval(() => {
        const next = order.pop()
        if (next) {
            next.classList.add('gone')
        } else {
            clearInterval(revealTimer)
        }
    }, tileDelay)
}

function revealAll() {
    clearInterval(revealTimer)
    tiles.querySelectorAll('.tile').forEach((tile) => tile.classList.add('gone'))
}

function showQuestion() {
    const question = questions[questionIndex]
    questionCounter.textContent = `Question ${questionIndex + 1} of ${questions.length}`
    questionText.textContent = question.question
    pictureImage.src = question.image
    picture.classList.remove('hide')
    coverPicture()
    result.textContent = ''
    startedAt = Date.now()

    answerButtons.forEach((button, index) => {
        button.textContent = question.answers[index]
        button.disabled = false
    })
}

ready.addEventListener('click', () => {
    const buttonBounds = ready.getBoundingClientRect()
    explosion.style.left = `${buttonBounds.left + buttonBounds.width / 2}px`
    explosion.style.top = `${buttonBounds.top + buttonBounds.height / 2}px`
    ready.disabled = true
    explosion.addEventListener('animationend', () => {
        explosion.classList.remove('playing')
        image.remove()
        ready.remove()
        cat.remove()
        frog.remove()
        answers.classList.remove('hide')
        showQuestion()
    }, { once: true })
    explosion.classList.add('playing')
})

answerButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const correct = index === questions[questionIndex].correctAnswer
        const points = saveScore('Black-out', correct, startedAt, questionIndex + 1)
        sessionPoints += points
        revealAll()
        answerButtons.forEach((answerButton) => {
            answerButton.disabled = true
        })
        result.textContent = correct
            ? `Correct! You earned ${points} points.`
            : `Incorrect. You earned ${points} points.`

        window.setTimeout(() => {
            questionIndex += 1

            if (questionIndex < questions.length) {
                showQuestion()
            } else {
                picture.classList.add('hide')
                answers.classList.add('hide')
                title.textContent = 'FINAL SCORE OF BLACK-OUT'
                questionCounter.textContent = ''
                questionText.textContent = `You earned ${sessionPoints} points in ${questions.length} questions.`
                restartButton.classList.remove('hide2')
                celebration.src = '../zyzz.gif'
                celebration.classList.add('visible')
            }
        }, 800)
    })
})

restartButton.addEventListener('click', () => {
    location.reload()
})
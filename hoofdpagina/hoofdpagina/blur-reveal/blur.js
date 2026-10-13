const ready = document.querySelector('#Ready')
const image = document.getElementById('oldinterface')
const answers = document.querySelector('#geefantwoorden')
const title = document.querySelector('#titlechange')
const result = document.querySelector('#round-result')
const frog = document.querySelector('#removefroggy')
const questionCounter = document.querySelector('#question-counter')
const questionText = document.querySelector('#question-text')
const homeLink = document.querySelector('#home-link')
const answerButtons = answers.querySelectorAll('button')
const questions = [
    {
        question: 'What animal is in the picture?',
        answers: ['A: A frog', 'B: A green ball', 'C: A hamster'],
        correctAnswer: 0
    },
    {
        question: 'What is the frog holding?',
        answers: ['A: A flower', 'B: A cookie', 'C: A leaf'],
        correctAnswer: 1
    },
    {
        question: 'What color is the frog?',
        answers: ['A: Green', 'B: Blue', 'C: Orange'],
        correctAnswer: 0
    }
]
let questionIndex = 0
let startedAt
let sessionPoints = 0

function showQuestion() {
    const question = questions[questionIndex]
    questionCounter.textContent = `Question ${questionIndex + 1} of ${questions.length}`
    questionText.textContent = question.question
    result.textContent = ''
    startedAt = Date.now()

    answerButtons.forEach((button, index) => {
        button.textContent = question.answers[index]
        button.disabled = false
    })
}

ready.addEventListener('click', () => {
    const buttonBounds = ready.getBoundingClientRect()
    const startRound = () => {
        image.remove()
        ready.remove()
        answers.classList.remove('hide')
        frog.classList.remove('hidingfroggy')
        frog.classList.add('revealing')
        showQuestion()
    }

    explosion.style.left = `${buttonBounds.left + buttonBounds.width / 2}px`
    explosion.style.top = `${buttonBounds.top + buttonBounds.height / 2}px`
    ready.disabled = true
    explosion.addEventListener('animationend', () => {
        explosion.classList.remove('playing')
        startRound()
    }, { once: true })
    explosion.classList.add('playing')
})

answerButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const correct = index === questions[questionIndex].correctAnswer
        const points = saveScore('Blur-in', correct, startedAt, questionIndex + 1)
        sessionPoints += points
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
                answers.classList.add('hide')
                title.textContent = 'FINAL SCORE'
                questionCounter.textContent = ''
                questionText.textContent = `You earned ${sessionPoints} points in ${questions.length} questions.`
                homeLink.classList.remove('hide')
            }
        }, 800)
    })
})

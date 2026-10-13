const ready = document.querySelector('#Ready')
const image = document.getElementById('oldinterface')
const answers = document.querySelector('#geefantwoorden')
const title = document.querySelector('#titlechange')
const result = document.querySelector('#round-result')
const questionCounter = document.querySelector('#question-counter')
const questionText = document.querySelector('#question-text')
const homeLink = document.querySelector('#home-link')
const answerButtons = answers.querySelectorAll('button')
const questions = [
    {
        question: 'What is shown in the picture?',
        answers: ['A: Blank browser window', 'B: Froggy with a cookie', 'C: Green ball'],
        correctAnswer: 0
    },
    {
        question: 'What words are in the blue title bar?',
        answers: ['A: Guessing Game', 'B: Blank browser page', 'C: Internet Search'],
        correctAnswer: 1
    },
    {
        question: 'What color is the top title bar?',
        answers: ['A: Red', 'B: Green', 'C: Blue'],
        correctAnswer: 2
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
       image.remove()
    ready.remove()
    answers.classList.remove('hide')
    showQuestion()
})

answerButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const correct = index === questions[questionIndex].correctAnswer
        const points = saveScore('Black-out', correct, startedAt, questionIndex + 1)
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

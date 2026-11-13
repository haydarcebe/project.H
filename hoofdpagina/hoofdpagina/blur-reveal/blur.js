const ready = document.querySelector('#Ready')
const explosion = document.getElementById('explosion')
const image = document.getElementById('oldinterface')
const answers = document.querySelector('#geefantwoorden')
const result = document.querySelector('#round-result')
const frog = document.querySelector('#removefroggy')
const frogImage = frog.querySelector('img')
const questionCounter = document.querySelector('#question-counter')
const questionText = document.querySelector('#question-text')
const celebration = document.getElementById('final-celebration')
const restartButton = document.querySelector('#restart-button')
const answerButtons = answers.querySelectorAll('button')
const titleremoveblur = document.querySelector('#removeblurtitle')
const loading = document.querySelector('#loading')
const loadError = document.querySelector('#load-error')
const loadErrorText = document.querySelector('#load-error-text')
const retryButton = document.querySelector('#retry-button')
 
let questions = []
let questionIndex = 0
let startedAt
let sessionPoints = 0
 
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = () => reject(new Error(`Afbeelding kon niet worden geladen: ${src}`))
        img.src = src
    })
}
 
async function loadGame() {
    loading.hidden = false
    loadError.hidden = true
    ready.disabled = true
 
    const minimumDelay = new Promise((resolve) => setTimeout(resolve, 1000))
 
    try {
        const response = await fetch('question.json')
        if (!response.ok) {
            throw new Error(`Server gaf status ${response.status}`)
        }
 
        const data = await response.json()
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('Er zijn geen vragen gevonden.')
        }
 
        await Promise.all(data.map((item) => preloadImage(item.image)))
        await minimumDelay
 
        questions = data
        ready.disabled = false
    } catch (error) {
        loadErrorText.textContent = `Het spel kon niet worden geladen. ${error.message}`
        loadError.hidden = false
    } finally {
        loading.hidden = true
    }
}
 
function showQuestion() {
    const question = questions[questionIndex]
    questionCounter.textContent = `Question ${questionIndex + 1} of ${questions.length}`
    questionText.textContent = question.question
    result.textContent = ''
    startedAt = Date.now()
 
    frogImage.src = question.image
    frog.classList.remove('revealing')
    void frog.offsetWidth
    frog.classList.add('revealing')
 
    answerButtons.forEach((button, index) => {
        button.textContent = question.answers[index]
        button.disabled = false
    })
}
 
ready.addEventListener('click', () => {
    if (questions.length === 0) return
 
    const buttonBounds = ready.getBoundingClientRect()
    const startRound = () => {
        ready.remove()
        titleremoveblur.remove()
        answers.classList.remove('hide')
        frog.classList.remove('hidingfroggy')
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
                frog.classList.add('hidingfroggy')
                answers.classList.add('hide')
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
 
retryButton.addEventListener('click', loadGame)
 
loadGame()
const ready = document.querySelector('#Ready')
const explosion = document.getElementById('explosion')
const picture = document.querySelector('#questionpicture')
const pictureImage = picture.querySelector('img')
const tiles = document.querySelector('#tiles')
const answers = document.querySelector('#geefantwoorden')
const result = document.querySelector('#round-result')
const questionCounter = document.querySelector('#question-counter')
const questionText = document.querySelector('#question-text')
const celebration = document.getElementById('final-celebration')
const restartButton = document.querySelector('#restart-button')
const answerButtons = answers.querySelectorAll('button')
const titleremoveblack = document.querySelector('#removeblacktitleremove')
const loading = document.querySelector('#loading')
const loadError = document.querySelector('#load-error')
const loadErrorText = document.querySelector('#load-error-text')
const retryButton = document.querySelector('#retry-button')
 
let questions = []
const tileCount = 20
const tileDelay = 700
let questionIndex = 0
let startedAt
let sessionPoints = 0
let revealTimer
 
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
        const response = await fetch('questions.json')
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
    if (questions.length === 0) return
 
    const buttonBounds = ready.getBoundingClientRect()
    const startRound = () => {
        ready.remove()
        titleremoveblack.remove()
        answers.classList.remove('hide')
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
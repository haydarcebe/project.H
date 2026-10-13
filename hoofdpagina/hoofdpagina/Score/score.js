const scoreStorageKey = 'guessingGameScores'
const maxSavedScores = 10

function getScores() {
    const savedScores = localStorage.getItem(scoreStorageKey)
    const scores = savedScores ? JSON.parse(savedScores) : []
    const recentScores = scores.slice(-maxSavedScores)

    if (recentScores.length !== scores.length) {
        localStorage.setItem(scoreStorageKey, JSON.stringify(recentScores))
    }

    return recentScores
}

function saveScore(mode, correct, startedAt, questionNumber) {
    const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000)
    const points = correct ? Math.max(10, 100 - elapsedSeconds * 5) : 0
    const scores = getScores()

    scores.push({
        mode,
        questionNumber,
        points,
        correct,
        playedAt: new Date().toLocaleString()
    })
    localStorage.setItem(scoreStorageKey, JSON.stringify(scores.slice(-maxSavedScores)))

    return points
}

const totalScore = document.querySelector('#total-score')
const roundList = document.querySelector('#round-list')

if (totalScore && roundList) {
    const scores = getScores()
    totalScore.textContent = scores.reduce((total, score) => total + score.points, 0)

    scores.slice().reverse().forEach((score) => {
        const round = document.createElement('li')
        const result = score.correct ? 'Goed' : 'Fout'
        const question = score.questionNumber ? ` - Question ${score.questionNumber}` : ''
        round.textContent = `${score.mode}${question}: ${score.points} punten (${result}) - ${score.playedAt}`
        roundList.appendChild(round)
    })

    if (scores.length === 0) {
        const emptyMessage = document.createElement('li')
        emptyMessage.textContent = 'Je hebt nog geen rondes gespeeld.'
        roundList.appendChild(emptyMessage)
    }
}
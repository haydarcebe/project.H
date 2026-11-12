   const ready = document.querySelector('#Ready')
    const explosion = document.getElementById('explosion')
    const image = document.getElementById('oldinterface')
    const answers = document.querySelector('#geefantwoorden')
    const title = document.querySelector('#titlechange')
    const result = document.querySelector('#round-result')
    const frog = document.querySelector('#removefroggy')
    const frogImage = frog.querySelector('img')   
    const questionCounter = document.querySelector('#question-counter')
    const questionText = document.querySelector('#question-text')
    const celebration = document.getElementById('final-celebration')
    const restartButton = document.querySelector('#restart-button')
    const answerButtons = answers.querySelectorAll('button')
    const titleremoveblur = document.querySelector('#removeblurtitle')
    const questions = [
        {
            question: 'What animal is in the picture?',
            image: 'frog.png',  
            answers: ['A: A frog', 'B: A green ball', 'C: A hamster'],
            correctAnswer: 0
        },
        {
            question: 'What animal is in the picture?',
            image: 'cat.png',   
            answers: ['A: A dog', 'B: A cat', 'C: A Horse'],
            correctAnswer: 1
        },
        {
            question: 'What animal is in the picture?',
            image: 'hamster.png',   
            answers: ['A: hamster', 'B: falcon', 'C: rat'],
            correctAnswer: 0
        },
        {
            question: 'What animal is in the picture?',
            image: 'penguin.png',   
            answers: ['A: penguin', 'B: bird', 'C: red-panda'],
            correctAnswer: 0
        },
        {
        question: 'What is shown in the picture?',
            image: 'oldinterface.png',
            answers: ['A: Blank browser window', 'B: Grey background ', 'C: Green ball'],
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
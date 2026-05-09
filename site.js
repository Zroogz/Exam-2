
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {

	// todo: create your "getNextQuestion" function
	const getNextQuestion = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple')
    const data = await response.json()
    return data.results[0]
}

	// todo: create your "renderQuestion" function
	// todo: create your "renderQuestion" function
const renderQuestion = (question) => {
    // decode the question text
    questionElement.textContent = decodeHtml(question.question)

    // clear old answers
    answersElement.innerHTML = ''

    // combine correct + incorrect answers
    const answers = shuffle([
        question.correct_answer,
        ...question.incorrect_answers
    ])

    // render each answer button
    answers.forEach(answer => {
        const button = document.createElement('button')
        button.textContent = decodeHtml(answer)
        button.classList.add('answer')

        // mark correct answer
        if (answer === question.correct_answer) {
            button.dataset.correct = 'true'
        }

        // add click handler
        button.addEventListener('click', () => {
            // disable all buttons
            document.querySelectorAll('.answer').forEach(btn => {
                btn.disabled = true
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct')
                } else {
                    btn.classList.add('incorrect')
                }
            })
        })

        answersElement.appendChild(button)
    })
}

	// add the event listener to the "nextQuestion" button
	nextQuestionElement.addEventListener('click', async () => {
    const question = await getNextQuestion()
    renderQuestion(question)
})

})()

// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.addEventListener('click', async () => {
    const question = await getNextQuestion()
    renderQuestion(question)
})

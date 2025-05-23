import { useState } from 'react'
import questions from './questions.js'
import './App.css'

function App() {
  const [current, setCurrent] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedBreed, setSelectedBreed] = useState(null)

  const breeds = [
    {
      name: 'Golden Retriever 🐾',
      img: './public/golden.png',
      reason:
        'Fluffy serotonin factory. Great with people, low drama, pro cuddler.',
    },
    {
      name: 'Poodle 🧠',
      img: './public/poodle.png',
      reason:
        'Comes in 3 sizes. Smarter than your ex. Will run your household with grace.',
    },
  ]

  const handleAnswer = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1)
    } else {
      const random = Math.floor(Math.random() * breeds.length)
      setSelectedBreed(breeds[random])
      setShowResult(true)
    }
  }

  const restartQuiz = () => {
    setCurrent(0)
    setShowResult(false)
    setSelectedBreed(null)
  }

  return (
    <div className="quiz-container">
      {showResult && selectedBreed ? (
        <div className="result">
          <h2>Science has spoken.</h2>
          <p>You clearly need a dog. Like, now.</p>
          <img
            src={selectedBreed.img}
            alt={selectedBreed.name}
            className="dog-img"
          />
          <h3>Suggested breed: {selectedBreed.name}</h3>
          <p>{selectedBreed.reason}</p>
          <button onClick={restartQuiz}>Take it again</button>
        </div>
      ) : (
        <div className="question">
          <h1>What would really make you happy? Take this scientific quiz:</h1>
          <h2>{questions[current].question}</h2>
          <ul>
            {questions[current].options.map((option, idx) => (
              <li key={idx}>
                <button onClick={handleAnswer}>{option}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App

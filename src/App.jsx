import { useState } from 'react'
import questions from './questions.js'
import './App.css'

function App() {
  const [current, setCurrent] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1)
    } else {
      setShowResult(true)
    }
  }

  const restartQuiz = () => {
    setCurrent(0)
    setShowResult(false)
  }

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result">
          <h2>Science has spoken.</h2>
          <p>You clearly need a dog. Like, now.</p>
          <img src="/dog.jpg" alt="A happy dog" className="dog-img" />
          <h3>Suggested breed: Golden Retriever 🐾</h3>
          <p>
            Why? Because they are fluffy serotonin factories. Great with people,
            low drama, pro cuddler.
          </p>
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
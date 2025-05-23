
import { useState } from 'react'
import questions from './questions.js'
import './App.css'

function App() {
  const [current, setCurrent] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedBreed, setSelectedBreed] = useState(null)
  const [scientificFact, setScientificFact] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const breeds = [
    {
      name: 'Golden Retriever 🐾',
      img: '/golden.png',
      reason:
        'Fluffy serotonin factory. Great with people, low drama, pro cuddler.',
    },
    {
      name: 'Poodle 🧠',
      img: '/poodle.png',
      reason:
        'Comes in 3 sizes. Smarter than you. Will run your household with grace.',
    },
    {
      name: 'Chihuahua 🐕',
      img: '/d6.png',
      reason:
        'Small but explosive. 90% attitude, 10% dog. A legend in a handbag.',
    },
    {
      name: 'mixed breed 🐶',
      img: '/d10.png',
      reason:
        'One of a kind. Might steal your sandwich, but definitely your heart.',
    },
    {
      name: 'Maltese 🐩',
      img: '/d13.png',
      reason:
        'Tiny cloud of joy. Born to sit on laps, judge silently, and look fabulous doing it.',
    },
    {
      name: 'Breton Spaniel 🐾',
      img: '/d15.png',
      reason:
        'Nature lover, loyal, and always up for a hike. Also great at naps.',
    },
  ]

  const scientificFacts = [
    "Dog owners walk an average of 22 minutes more per day. Free cardio!",
    "You're 3x more likely to meet new people with a dog. Furry wingman power.",
    "Dogs lower your risk of heart disease. That tail wag is medicine.",
    "People with dogs often sleep better. Snores and all.",
    "Petting a dog boosts dopamine in 10 minutes. Instant happy mode.",
  ]

  const handleAnswer = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1)
    } else {
      setIsLoading(true)
      setTimeout(() => {
        const randomBreed = Math.floor(Math.random() * breeds.length)
        const randomFact = Math.floor(Math.random() * scientificFacts.length)
        setSelectedBreed(breeds[randomBreed])
        setScientificFact(scientificFacts[randomFact])
        setIsLoading(false)
        setShowResult(true)
      }, 2000)
    }
  }

  const restartQuiz = () => {
    setCurrent(0)
    setShowResult(false)
    setSelectedBreed(null)
    setIsLoading(false)
    setScientificFact("")
  }

  return (
    <div className="quiz-container">
      {isLoading ? (
        <div className="loading">
          <h2>Analyzing your answers...</h2>
          <img
            src="/loading-dog.gif"
            alt="Loading dogs"
            className="loading-gif"
          />
        </div>
      ) : showResult && selectedBreed ? (
        <div className="result">
          <h1>Science has spoken.</h1>
          <p>You clearly need a dog. Like, now.</p>
          <img
            src={selectedBreed.img}
            alt={selectedBreed.name}
            className="dog-img"
          />
          <h3>Suggested breed: {selectedBreed.name}</h3>
          <p>{selectedBreed.reason}</p>
          <p className="fun-fact">
            <strong>Scientific Fact:</strong> {scientificFact}
          </p>
          <button onClick={restartQuiz}>Take it again</button>
        </div>
      ) : (
        <div className="question">
          <h1>What would really make you happy?</h1>
          <h2>Take this scientific quiz:</h2>
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

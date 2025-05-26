
import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import questions from './questions.js'
import './App.css'

function App() {
  const [current, setCurrent] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedBreed, setSelectedBreed] = useState(null)
  const [scientificFact, setScientificFact] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [lang, setLang] = useState("en")

  const breeds = [
    { name: 'Golden Retriever 🐾', img: '/golden.png', reason: { en: 'Fluffy serotonin factory.', es: 'Fábrica de serotonina con pelo.' } },
    { name: 'Poodle 🧠', img: '/poodle.png', reason: { en: 'Smarter than you.', es: 'Más inteligente que vos.' } },
    { name: 'Chihuahua 🐕', img: '/d6.png', reason: { en: '90% attitude, 10% dog.', es: '90% actitud, 10% perro.' } },
    { name: 'Mixed Breed 🐶', img: '/d10.png', reason: { en: 'Might steal your sandwich.', es: 'Capaz te roba el sándwich.' } },
    { name: 'Maltese 🐩', img: '/d13.png', reason: { en: 'Looks fabulous doing nothing.', es: 'Luce fabuloso sin hacer nada.' } },
    { name: 'Breton Spaniel 🐾', img: '/d15.png', reason: { en: 'Hiker and napper.', es: 'Ama caminar y dormir siestas.' } },
  ]

  const scientificFacts = {
    en: [
      "Dog owners walk more. Free cardio!",
      "Dogs lower your risk of heart disease.",
      "Petting a dog = instant dopamine boost.",
    ],
    es: [
      "Los dueños de perros caminan más. ¡Cardio gratis!",
      "Tener perro baja el riesgo cardíaco.",
      "Acariciar un perro = subidón de dopamina.",
    ],
  }

  const t = {
    en: {
      introTitle: "WHAT WOULD REALLY MAKE YOU HAPPY?",
      introSubtitle: "Take this scientific quiz:",
      analyzing: "Analyzing your answers...",
      resultTitle: "Science has spoken.",
      resultSubtitle: "You clearly need a dog. Like, now.",
      breedSuggestion: "Suggested breed:",
      fact: "Scientific Fact",
      restart: "Take it again",
      dark: "🌙 Dark",
      light: "☀️ Light",
      lang: "🇪🇸 Español",
    },
  es: {
  introTitle: "¿QUÉ TE HARÍA REALMENTE FELIZ?".toUpperCase(),
  introSubtitle: "Tomá este test científico:".toUpperCase(),
  analyzing: "Analizando tus respuestas...".toUpperCase(),
  resultTitle: "La ciencia habló.".toUpperCase(),
  resultSubtitle: "Claramente necesitás un perro. Ya.".toUpperCase(),
  breedSuggestion: "Raza sugerida:".toUpperCase(),
  fact: "Dato científico".toUpperCase(),
  restart: "Hacerlo de nuevo".toUpperCase(),
  dark: "🌙 Oscuro".toUpperCase(),
  light: "☀️ Claro".toUpperCase(),
  lang: "🇺🇸 English",
}
  
  }[lang]

  const handleAnswer = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1)
    } else {
      setIsLoading(true)
      setTimeout(() => {
        const randomBreed = Math.floor(Math.random() * breeds.length)
        const randomFact = Math.floor(Math.random() * scientificFacts[lang].length)
        setSelectedBreed(breeds[randomBreed])
        setScientificFact(scientificFacts[lang][randomFact])
        setIsLoading(false)
        setShowResult(true)
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } })
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

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <div className="quiz-container">
      <div className="top-controls">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? t.light : t.dark}
        </button>
        <button onClick={() => setLang(lang === "en" ? "es" : "en")}>
          {t.lang}
        </button>
      </div>

      {isLoading ? (
        <div className="loading">
          <h2>{t.analyzing}</h2>
          <img src="/IMG_4032.GIF" alt="Loading dogs" className="loading-gif" />
        </div>
      ) : showResult && selectedBreed ? (
        <div className="result">
            <div className="result-card">
          <h1>{t.resultTitle}</h1>
          <p>{t.resultSubtitle}</p>
          <img src={selectedBreed.img} alt={selectedBreed.name} className="dog-img" />
          <h3>{t.breedSuggestion} {selectedBreed.name}</h3>
          <p>{selectedBreed.reason[lang]}</p>
          <p className="fun-fact">
            <strong>{t.fact}:</strong> {scientificFact}
          </p>
          <button onClick={restartQuiz}>{t.restart}</button>
          </div>
        </div>
      ) : (
        <div className="question">
          <img src="/happy-dog.png" alt="Happy dog" className="intro-img" />
          <h1>{t.introTitle}</h1>
          <h2>{t.introSubtitle}</h2>
         <h2 className="question-text">{questions[current].question[lang]}</h2>
<ul>
  {questions[current].options[lang].map((option, idx) => (
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

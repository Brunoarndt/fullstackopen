import { useState } from 'react'

const Botao = ({handleCLique, texto}) => (
  <button onClick={handleCLique}>
    {texto}
  </button>
)

const App = () => {
  // salve os cliques de cada botão em seu próprio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [media, setMedia] = useState(0)

  const handleCLiqueGood = () => {
    setGood(good + 1)
    setTotal(total+1)
    setMedia(media+1)
  }

  const handleCLiqueNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total+1)
  }

  const handleCLiqueBad = () => {
    setBad(bad + 1)
    setTotal(total+1)
    setMedia(media-1)
  }

  return (
    <div>
      <p>Give feedback</p> 
      <Botao handleCLique={handleCLiqueGood} texto="good"/>
      <Botao handleCLique={handleCLiqueNeutral} texto="neutral"/>
      <Botao handleCLique={handleCLiqueBad} texto="bad"/>
      <p>Statistics</p>
      <p>good {good} </p>
      <p>neutral {neutral} </p>
      <p>bad {bad} </p>
      <p>all {total}</p>
      <p>average {media} </p>
      <p>positive {(good/total)*100} %</p>
    </div>
  )
}

export default App